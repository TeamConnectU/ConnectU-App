var User = require('../models/user');
var mongoose = require('mongoose');
var express = require('express');
var session = require('express-session');
var passport = require('passport');
var authRouter = require('../server/routes/auth');
var LinkedInStrategy = require('passport-linkedin');
var config = require('./_config');


passport.use(new LinkedInStrategy({
  consumerKey: config.linkedin.clientID,
  consumerSecret: config.linkedin.clientSecret,
  callbackURL: config.linkedin.callbackURL
},
  // linkedin sends back the tokens and profile info
  function(token, tokenSecret, profile, done) {

    var searchQuery = {
      linkedin_id: profile.id
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

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

module.exports = passport;
