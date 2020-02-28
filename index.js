const express = require('express'); // Common modules syntax 'require' -- node still uses it
const mangoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
// Load mongoos models
require('./models/User');
require('./models/Survey');

// load passport file
require('./services/passport');


mangoose.connect(keys.mongoURI);


const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30days in ms
    keys: [keys.cookieKey] // To encript the sessionId
  })
);
app.use(passport.initialize());
app.use(passport.session());


require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets and static folder (UI)
  app.use(express.static('client/build'));

  // Express will serve index.html for rest of unknown routes
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000; // Start server to listen to port 5000
app.listen(PORT);