const validateLoginFilter = require('../middlewares/validateLogin');
const validateCreditsFilter = require('../middlewares/validateCredits');
const mongoose = require('mongoose');
const surveyEmailTemplate = require('../services/surveyEmailTemplate');
const Mailer = require('../services/Mailer');
const Survey = mongoose.model('surveys');

const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');

module.exports = app => {

  app.get('/api/surveys', validateLoginFilter, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false
    });

    res.send(surveys);
  });

  app.post('/api/surveys', validateLoginFilter, validateCreditsFilter, async (req, res) => {
    const {title, subject, body, recipients} = req.body;

    try {
      const surveyObj = new Survey({
        title,
        subject,
        body,
        recipients: recipients.split(',').map(email => ({email: email.trim()})),
        _user: req.user.id,
        dateSent: Date.now()
      })

      //Place to create mailer instance
      const mailer = new Mailer(surveyObj, surveyEmailTemplate(surveyObj));
      await mailer.send();
      await surveyObj.save();
      req.user.credits -= 1;
      const updatedUser = await req.user.save();

      res.send(updatedUser);
    } catch (e) {
      res.status(422).send(e);
    }

  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {

    const p = new Path('/api/surveys/:surveyId/:choice');

    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 }, // Increment either yes or no by 1
            $set: { 'recipients.$.responded': true }, // $ will ref the $elemmatch recipient and update it
            lastResponded: Date.now()
          }
        ).exec();
      })
      .value();
    console.log(req.body);
    res.send({});
  })
};