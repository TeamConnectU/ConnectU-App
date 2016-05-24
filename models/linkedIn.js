var User = require('./user');
var mongoose = require('mongoose');
var express = require('express');
var session = require('express-session');
var authRouter = require('../server/routes/auth');

passport.use(new LinkedInStrategy({
    consumerKey: '773a8a5y9gfyug',
    consumerSecret: 'V3KSkOqbhSUHUmzv',
    callbackURL: 'http://localhost:3000/auth/linkedin/callback'
  },
  // linkedin sends back the tokens and profile info
  function(token, tokenSecret, profile, done) {

    var searchQuery = {
      linkedin_id: profile.id,
      // email: profile.email-address,
      // first_name: profile.first-name,
      // last_name: profile.last-name
    };

    var updates = {
      linkedin_id: profile.id,
      email: profile.email-address,
      first_name: profile.first-name,
      last_name: profile.last-name,
      photo_url: profile.picture-url,
      linkedin_url: profile.public-profile-url
    };

    var options = {
      upsert: true
    };

    // update the user if s/he exists or add a new user
    User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
      if(err) {
        return done(err);
      } else {
        return done(null, user);
      }
    });
  }

));

passport.serializeUser(function(user, done){
  console.log('Hit serializeUser');
  done(null, user.id); //Trail of breadcrumbs back to user
});

passport.deserializeUser(function(userId, done) {
  console.log('Hit deserializeUser');

  User.findById(id, function(err, user){
    if(err){
      done(err);
    } else {
      done(null, user);
    }
  });

});

module.exports = linkedIn;
