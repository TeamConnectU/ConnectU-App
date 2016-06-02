var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var User = require('../../models/user');
var Internship = require('../../models/internship').model;
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

router.put('/update', function(req, res){

  console.log('router.put req.body:', req.body);
  console.log('request by user', req.user);

  User.findById(req.user._id, function(err, user){
    console.log('findbyid user:', user);
    // user = req.body;
    // req.user = req.body;

    Internship.create({site:req.body.internships[0].site, year: req.body.internships[0].year}, function(err, newInternship){
      console.log('newInternship:', newInternship);
      // user.internships[0].site = req.body.internships[0].site;
      // user.internships[0].year = req.body.internships[0].year;
      if(req.body.seeking_internship){
        user.seeking_internship = req.body.seeking_internship;
      }
      if(req.body.seeking_employment){
        user.seeking_employment = req.body.seeking_employment;
      }
      if(req.body.college){
        user.college = req.body.college;
      }
      if(req.body.collegeYear){
        user.collegeYear = req.body.collegeYear;
      }
      if(req.body.current_workplace){
        user.current_workplace = req.body.current_workplace;
      }

      user.internships.push(newInternship);

      user.slack_id = req.body.slack_id;
      user.high_school = req.body.high_school;
      user.focus = req.body.focus;
      user.city = req.body.city;
      user.state = req.body.state;
      user.quote = req.body.quote;
      user.phone = req.body.phone;
      user.interest = req.body.interest;

      user.save(function (err){
        if(err){
          console.log('error updating user', err);
          res.sendStatus(500);

        } else {
          console.log('sucess updating user!!!');
          res.sendStatus(200);

        }
      })
    });

  });
});

//PUT and DELETE calls are only available to the site administrator
// router.put('/update', function(req, res){
//   var editedUser = req.body;
//   User.findOneAndUpdate({_id: req.body._id}, editedUser).exec(function(err, user) {
//     if (err){
//       console.log('User update failed:', err);
//       res.sendStatus(500);
//     } else {
//       console.log('User updated successfully:', user);
//       res.sendStatus(200);
//     }
//   });
// });

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
