const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then(user => {
      done(null, user);
    })
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true // Make heroku to issue callback with https
  },
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({googleId: profile.id})
    console.log('Exist')
    console.log(existingUser)
    if (existingUser) {
      // User is already logged In
      done(null, existingUser)
    } else {
      // save will persist to mongoDb
      const newUser = await new User({
        googleId: profile.id
      }).save()

      done(null, newUser)
    }
  }));