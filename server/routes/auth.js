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
    var loggedIn = req.isAuthenticated();
    // Successful authentication
    res.redirect('/');

  });

  router.get('/loggedIn', function(req, res, next) {

      loggedIn = req.isAuthenticated();
      res.send(loggedIn);
  });

  router.get('/validateData', function(req, res, next) {
      var user = req.user;
      var dataValid = false;
      User.findById(user._id, function(err, user){
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
        if(user.admin === true){
          admin = true;
        }
        res.send(admin);

      });

  });


  router.get('/getUserId', function(req, res, next) {

      res.send(req.user);
  });


router.get('/logout', function(req, res) {
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

  User.create(request.body, function(err){
    if(err){
      response.sendStatus(500);
    } else {

      response.sendStatus(200);
    }
  });
});


module.exports = router;
