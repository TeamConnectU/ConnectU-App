var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var session = require('express-session');

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

app.use(cookieParser());
app.use(cookieSession({
  name: 'linkedin-oauth-session-example',
  keys: ['773a8a5y9gfyug', 'V3KSkOqbhSUHUmzv']
}));
app.use(passport.initialize());
app.use(passport.session());

//[[[[[[[[[[[[[[[[[[[[[[[ PASSPORT LINKEDIN STRATEGY ]]]]]]]]]]]]]]]]]]]]]]]]]]

passport.use(new LinkedInStrategy({
  clientID: '773a8a5y9gfyug',
  clientSecret: 'V3KSkOqbhSUHUmzv',
  callbackURL: 'http://localhost:3000/auth/linkedin/callback',
  scope: ['r_emailaddress', 'r_basicprofile'],
  state: true
}, function(accessToken, refreshToken, profile, done) {
  MongoDB('users')
    .where({ linkedin_id: profile.id })
    .orWhere({ email: profile.emails[0].value })
    .first()
    .then(function (user) {
      if ( !user ) {
        return MongoDB('users').insert({
          linkedin_id: profile.id,
          email: profile.emails[0].value,
          first_name: profile.name.givenName,
          last_name: profile.name.familyName,
          photo_url: profile.photos[0].value
        }, 'id').then(function (id) {
          return done(null, id[0]);
        });
      } else {
        return done(null, user.id);
      }
    });
}));

passport.serializeUser(function(user, done) {
  // later this will be where you selectively send to the browser
  // an identifier for your user, like their primary key from the
  // database, or their ID from linkedin

  done(null, user);
});

passport.deserializeUser(function(userId, done) {
  // here is where you will go to the database and get the
  // user each time from it's id, after you set up your db

  if ( userId ) {
    MongoDB('users')
      .where({ id: userId })
      .first()
      .then(function (user) {
        ( !user ) ? done() : done(null, user);
      })
      .catch(function (err) {
        done(err, null);
      });
  } else {
    done();
  }
});

var server = app.listen(process.env.PORT || 3000, function(){
  var port = server.address().port;
  console.log('Listening on port:', port + ". Press ctrl-c to end.");
});
