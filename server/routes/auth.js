var router = require('express').Router();
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('../../models/user');
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var session = require('express-session');
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
      // console.log('request:', req);
      // console.log('response:', res);
      loggedIn = req.isAuthenticated();
      res.send(loggedIn);
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
  res.sendFile(path.resolve(__dirname,'../views/index.html'));
});

router.post('/',
  passport.authenticate('local', {
    successRedirect:'/success',
    failureRedirect:'/failure'
  })
);



// router.get('/failure', function(request, response) {
//   response.sendFile(path.join(__dirname, '../public/views/failure.html'));
// });
//
// router.post('/', passport.authenticate('local', {
//   successRedirect: '/success',
//   failureRedirect: '/failure'
// }));
//
// router.get('/success', function(request, response) {
//   console.log(request.user);
//   console.log('User is logged in:' , request.isAuthenticated());
//   response.sendFile(path.join(__dirname, '../public/views/success.html'));
// });
//
// router.get('/logout', function(request, response){
//   request.logout();
//   response.redirect('/');
// });
//
// router.post('/new', function(request, response){
//   console.log(request.body);
//
//   Admin.create(request.body, function(err){
//     if(err){
//       console.log('AHHH ERROR', err);
//       response.sendStatus(500);
//     } else {
//       response.sendStatus(200);
//     }
//   });
// });
//
// router.get('/user/:id', function(request, response) {
//   response.sendFile(path.join(__dirname, '../public/views/failure.html'));
// });
//
// router.get('/:name', function(request, response) {
//   response.sendFile(path.join(__dirname, '../public/views/failure.html'));
// });
//
// router.get('/*', function(request, response, next){
//   if(request.isAuthenticated()){
//     next();
//   } else {
//     response.send('404 not found');
//   }
// });

module.exports = router;
