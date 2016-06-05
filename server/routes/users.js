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
    User.find({"admin": false}, function(err, users){
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
    // Internship.create({site:req.body.internships[0].site, year: req.body.internships[0].year}, function(err, newInternship){
      // console.log('newInternship:', newInternship);
      // user.internships[0].site = req.body.internships[0].site;
      // user.internships[0].year = req.body.internships[0].year;
      if(req.body.seeking_none){
        user.seeking_internship = false;
        user.seeking_employment = false;
      }

      if(req.body.seeking_internship && req.body.seeking_employment){
        user.seeking_internship = req.body.seeking_internship;
        req.body.seeking_employment = req.body.seeking_employment;
      }

      if(req.body.seeking_employment){
        user.seeking_internship = false;
        user.seeking_employment = req.body.seeking_employment;
      }

      if(req.body.seeking_internship){
        user.seeking_employment = false;
        user.seeking_internship = req.body.seeking_internship;
      }

      if(req.body.college){
        user.college = req.body.college;
      }

      if(req.body.graduate){
        user.first_year = false;
        user.sophomore = false;
        user.junior = false;
        user.senior = false;
        user.graduate = req.body.graduate;
      }

      if(req.body.first_year){
        user.first_year = req.body.fisrt_year;
        user.sophomore = false;
        user.junior = false;
        user.senior = false;
        user.graduate = false;
      }

      if(req.body.sophomore){
        user.first_year = false;
        user.sophomore = req.body.sophomore;
        user.junior = false;
        user.senior = false;
        user.graduate = false;
      }

      if(req.body.junior){
        user.first_year = false;
        user.sophomore = false;
        user.junior = req.body.junior;
        user.senior = false;
        user.graduate = false;
      }

      if(req.body.senior){
        user.first_year = false;
        user.sophomore = false;
        user.junior = false;
        user.senior = req.body.senior;
        user.graduate = false;
      }

      if(req.body.current_workplace){
        user.current_workplace = req.body.current_workplace;
      }

      if(req.body.internshipTwo){
        user.internshipTwo.site = req.body.internshipTwo.site;
        user.internshipTwo.year = req.body.internshipTwo.year;
      }

      if(req.body.internshipOne){
        user.internshipOne.site = req.body.internshipOne.site;
        user.internshipOne.year = req.body.internshipOne.year;
      }

      if(req.body.slack_id){
        user.slack_id = req.body.slack_id;
      }

      if(req.body.high_school){
        user.high_school = req.body.high_school;
      }

      if(req.body.focus){
        user.focus = req.body.focus;
      }

      if(req.body.city){
        user.city = req.body.city;
      }

      if(req.body.state){
        user.state = req.body.state;
      }

      if(req.body.quote){
        user.quote = req.body.quote;
      }

      if(req.body.phone){
        user.phone = req.body.phone;
      }

      if(req.body.interestedIn){
        user.interestedIn = req.body.interestedIn;
      }

      user.save(function (err){
        if(err){
          console.log('error updating user', err);
          res.sendStatus(500);

        } else {
          console.log('sucess updating user!!!');
          res.sendStatus(200);

        }
      })
    // });

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
