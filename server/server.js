var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var passport = require('passport');
var session = require('express-session');
var User = require('../models/user');

//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[ LOCAL ROUTES ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');
var authRouter = require('./routes/auth');

//[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]] MONGODB ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
var mongoURI = 'mongodb://localhost/connectU';
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function(err) {
    console.log('MongoDB connection error:', err);
});
MongoDB.once('open', function() {
    console.log('MongoDB connection open');
});

//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[ EXPRESS ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);

app.use(session({
  secret:'keyboard cat',
  resave: true,
  saveUninitialized: false,
  cookie: {maxAge: 600000, secure: false}
}));

app.use(passport.initialize());
app.use(passport.session());

//[[[[[[[[[[[[[[[[[[[[[[[ PASSPORT LINKEDIN STRATEGY ]]]]]]]]]]]]]]]]]]]]]]]]]]
passport.use(new LinkedInStrategy({
    consumerKey: '773a8a5y9gfyug',
    consumerSecret: 'V3KSkOqbhSUHUmzv',
    callbackURL: 'http://localhost:3000/auth/linkedin/callback'
  },
  // linkedin sends back the tokens and progile info
  function(token, tokenSecret, profile, done) {

    var searchQuery = {
      name: profile.displayName
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

//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[ SERVER ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
var server = app.listen(process.env.PORT || 3000, function(){
  var port = server.address().port;
  console.log('Listening on port:', port + ". Press ctrl-c to end.");
});
