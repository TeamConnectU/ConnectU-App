var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var passport = require('passport');
var session = require('express-session');
var localStrategy = require('passport-local').Strategy;

//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[ LOCAL ROUTES ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var getCityRouter = require('./routes/getCity');

//[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]] MONGODB ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
var mongoURI = 'mongodb://localhost/connectU';
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function(err) {
    console.log('MongoDB connection error:', err);
});
MongoDB.once('open', function() {
    console.log('MongoDB connection open');
});

//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[ EXPRESS ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/getCity', getCityRouter);

app.use(session({
  secret:'keyboard cat',
  resave: true,
  saveUninitialized: false,
  cookie: {maxAge: 600000, secure: false}
}));

app.use(passport.initialize());
app.use(passport.session());

//[[[[[[[[[[[[[[]]]][[[[[[[[[ PASSPORT STRATEGY ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]

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
        return done(null, false, {message: 'Incorrect username or password'});
      }

      user.comparePassword(password, function(err, isMatch){
        if(err){
          console.log(err);
        }

        if(isMatch){
          return done(null, user);
        } else {
          return done(null, false, {message: 'Incorrect username or password'});
        }

      });

    });

  }
));

passport.serializeUser(function(user, done){
  console.log('Hit serializeUser');
  done(null, user.email-address);
});

passport.deserializeUser(function(id, done){
  console.log('Hit deserializeUser');

  User.findById(email, function(err, user){
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
