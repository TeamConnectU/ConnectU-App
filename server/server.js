var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var User = require('../models/user');
var morgan = require('morgan');
var passport = require('passport');
var session = require('express-session');
var localStrategy = require('passport-local').Strategy;
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var users = require('./routes/users');


//local routes
var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var getCityRouter = require('./routes/getCity');

//MongoDb
var mongoURI = 'mongodb://localhost/connectU';
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function(err) {
    console.log('MongoDB connection error:', err);
});
MongoDB.once('open', function() {
    console.log('MongoDB connection open');
});

//express
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

// log requests to the console
app.use(morgan('dev'));

//express session
app.use(session({
  secret:'keyboard cat',
  resave: true,
  saveUninitialized: false,
  cookie: {maxAge: 600000, secure: false}
}));

//passport
app.use(passport.initialize());
app.use(passport.session());

//admin local Passport strategy
passport.use('local', new localStrategy({
  passReqToCallback: true,
  usernameField: 'email'
 },
  function(request, email, password, done){
    console.log('CHECKING PASSWORD');

    User.findOne({email: email}, function(err, user){
      if(err){
        console.log(err);
      }

      if(!user){
        console.log('User not found');
        return done(null, false, {message: 'invalid email'});
      }

      user.comparePassword(password, function(err, isMatch){
        if(err){
          console.log(err);
        }

        if(isMatch){
          console.log('MATCH FOUND');
          return done(null, user);
        } else {
          console.log('MATCH NOT FOUND');
          return done(null, false, {message: 'incorrect password'});
        }

      });

    });

  }
));

//alumni LinkedIn Passport strategy
passport.use(new LinkedInStrategy({
  clientID: '773a8a5y9gfyug',
  clientSecret: 'V3KSkOqbhSUHUmzv',
  callbackURL: 'http://localhost:3000/auth/linkedin/callback',
  scope: ['r_emailaddress', 'r_basicprofile'],
}, function(accessToken, refreshToken, profile, done) {
  process.nextTick(function(){

    var searchQuery = {
      linkedin_id: profile.id
    };

    if(profile._json.pictureUrls.values){
      var updates = {
        linkedin_id: profile._json.id,
        email: profile._json.emailAddress,
        first_name: profile._json.firstName,
        last_name: profile._json.lastName,
        photo_url: profile._json.pictureUrls.values[0],
        linkedin_url: profile._json.publicProfileUrl,
      };
    } else {

      var updates = {
        linkedin_id: profile._json.id,
        email: profile._json.emailAddress,
        first_name: profile._json.firstName,
        last_name: profile._json.lastName,
        linkedin_url: profile._json.publicProfileUrl,
      };
    }

    var options = {
      upsert: true
    };


    //We want this to be find or create, make user if not there

    //update the user if s/he exists or add a new user
    User.findOne(searchQuery, options, function(err, user) {
      if(err) {
        return done(err);
      }

      if(user){
        return done(null, user);
      } else {
        User.create(updates, function(err, createdUser){
          return done(null, createdUser);
        });
      }
    });



    }

  );

}));

app.get('/auth/linkedin',
  passport.authenticate('linkedin', {state: 'LOLznuiJZx'}),
  function(req, res){
    // console.log('passport.authenticate');
  });

app.post('/auth/linkedin/callback', passport.authenticate('linkedin', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

//serialization for both user and admin logins
passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){

  User.findOne({_id: id}, function(err, user){
    if(err){
      done(err);
    } else {
      done(null, user);
    }
  });


});

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/getCity', getCityRouter);
app.use('/*', indexRouter);

//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[ SERVER ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
var server = app.listen(process.env.PORT || 3000, function(){
  var port = server.address().port;
  console.log('Listening on port:', port + ". Press ctrl-c to end.");
});
