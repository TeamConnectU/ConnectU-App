var router = require('express').Router();
var passport = require('passport');
var linkedIn = require('../../models/linkedIn');

router.get('/linkedin', linkedIn.authenticate('linkedin'));

router.get('/linkedin/callback',
  linkedIn.authenticate('linkedin', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication
    res.json(req.user);
  });

router.get('/logout', function(req, res, next) {
  req.session = null;
  res.redirect('/');
});

module.exports = router;
