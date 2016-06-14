var router = require('express').Router();
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('../../models/user');
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var session = require('express-session');
var mongoose = require('mongoose');
var path = require('path');

//Passport-LinkedIn routes
// router.get('/linkedin', passportLinkedIn.authenticate('linkedin'));
var loggedIn = '';


//Oliver changed. res.redirect
router.get('/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('this is from the callback');
    console.log('req.user:', req.user);
    console.log('req.isAuthenticated:', req.isAuthenticated());
    var loggedIn = req.isAuthenticated();
    // Successful authentication
    res.redirect('/');

    // res.json(req.user);
  });

  router.get('/loggedIn', function(req, res, next) {
      console.log('requested from auth/loggedIn');
      // console.log('request from loggedIn:', req);
      // console.log('response:', res);
      loggedIn = req.isAuthenticated();
      res.send(loggedIn);
  });

  router.get('/validateData', function(req, res, next) {
      // console.log('hi from validateData');
      var user = req.user;
      var dataValid = false;
      User.findById(user._id, function(err, user){
        console.log('findbyid user:', user);
        if(user.high_school){
          dataValid = true;
        }
        res.send(dataValid);
      });

  });

  router.get('/validateAdmin', function(req, res, next) {
      // console.log('hi from validateAdmin');
      var user = req.user;
      var admin = false;
      User.findById(user._id, function(err, user){
        console.log('validateAdmin findbyid user:', user);
        if(user.admin === true){
          admin = true;
        }
        res.send(admin);

      });

  });


  router.get('/getUserId', function(req, res, next) {
      console.log('loggedIn from auth/loggedIn');
      console.log('requestUser:', req.user);
      // console.log('response:', res);
      res.send(req.user);
  });

// router.get('/logout', function(req, res, next) {
//   req.session = null;
router.get('/logout', function(req, res) {
  console.log('called log out');
  req.logout();
  res.redirect('/');
});


//Password authentication for adminModel
router.get('/', function(req,res,next){
  res.sendFile(path.resolve(__dirname,'../views/main.html'));
});

router.post('/',
  passport.authenticate('local'), function(req, res){
    res.sendStatus(200);
  });


// add new admin
// create a new admin account (accessible via the admin login) (POST http://localhost:3000/auth/register)
router.post('/register', function(request, response){
  console.log(request.body);

  User.create(request.body, function(err){
    if(err){
      console.log('AHHH ERROR', err);
      response.sendStatus(500);
    } else {
      
      response.sendStatus(200);
    }
  });
});


module.exports = router;
