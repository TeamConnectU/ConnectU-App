var router = require('express').Router();
var passport = require('passport');

router.get('/linkedin', passportLinkedIn.authenticate('linkedin'));

router.get('/linkedin/callback',
  passportLinkedIn.authenticate('linkedin', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication
    res.json(req.user);
  });

router.get('/logout', function(req, res, next) {
  req.session = null;
  res.redirect('/');
});

module.exports = router;
