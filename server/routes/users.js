var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var User = require('../../models/user');
var passport = require('passport');
var session = require('express-session');
var localStrategy = require('passport-local').Strategy;
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var router = require('express').Router();

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
            console.log('res.req.body:', res.req.body);
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
  console.log('delete call hit user router');
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
