var router = require('express').Router();
var User = require('../../models/user');

router.get('/', function(req, res){
    User.find({}, function(err, users){
        if(err){
            console.log('error retrieving user', err);
            res.sendStatus(500);
        } else {
            res.send(users);
        }
    }).sort({ "last_name": 1, "first_name": 1 });
});

router.post('/add', function(req, res){
    User.create(req.body, function(err){
        if(err){
            console.log('Error: User not saved', err);
            res.sendStatus(500);
        } else {
            console.log('User successfully saved!');
            res.sendStatus(200);
        }
    });
});

//PUT and DELETE calls are only available to the site administrator
router.put('/update', function(req, res){
  var editedUser = req.body;
  User.findOneAndUpdate({_id: req.body._id}, editedUser).exec(function(err, user) {
    if (err){
      console.log('User update failed:', err);
      res.sendStatus(500);
    } else {
      console.log('User updated successfully:', user);
      res.sendStatus(200);
    }
  });
});

router.delete('/remove/:id', function(req, res){
  var userID = req.params.id;
    User.findOneAndRemove({_id: userID}).exec(function(err, user){
        if(err){
            console.log('could not delete user:', err);
            res.sendStatus(500);
        } else {
            console.log('user deleted');
            res.sendStatus(200);
        }
    });
});

module.exports = router;
