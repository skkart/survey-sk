const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const validateLoginFilter = require('../middlewares/validateLogin');

module.exports = app => {
  app.post('/api/stripe', validateLoginFilter, async (req, res) => {

    // const charge = await stripe.charges.create({
    //   amount: 500,
    //   currency: 'usd',
    //   description: 'Pay $5 for 5 Surveys',
    //   source: req.body.id,
    //   name: req.body.email,
    //   address: {
    //     line1: '510 Townsend St',
    //     postal_code: '98140',
    //     city: 'San Francisco',
    //     state: 'CA',
    //     country: 'US',
    //   }
    // });

    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  })
};