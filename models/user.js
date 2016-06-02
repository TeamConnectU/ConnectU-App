var mongoose = require('mongoose');
var encryptLib = require('../auth/encryption');
var internshipSchema = require('./internship').schema;
var Schema = mongoose.Schema;

var SALT_WORK_FACTOR = 10;

var internshipSchema = new Schema({
  site: {type: String},
  year: {type: Number}
});

var userSchema = new Schema({
  email: {type: String, required: true, unique: true},
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  city: {type: String},
  state: {type: String},
  phone: {type: String},
  high_school: {type: String},
  college: {type: String},
  first_year: {type: Boolean, default: false},
  sophomore: {type: Boolean, default: false},
  junior: {type: Boolean, default: false},
  senior: {type: Boolean, default: false},
  graduate: {type: Boolean, default: false},
  current_workplace: {type: String},
  slack_id: {type: String},
  linkedin_id: {type: String},
  linkedin_url: {type: String},
  focus: {type: String},
  quote: {type: String},
  interestedIn: {type: String},
  seeking_internship: {type: Boolean},
  seeking_employment: {type: Boolean},
  admin: {type: Boolean, default: false},
  internships: [internshipSchema],
  photo_url: {type: String},
  password: {type: String}

});

  userSchema.pre('save', function(next){
    console.log('running pre save user function');
    var user = this;
    //if password has not changed, do not proceed
    if(!user.isModified('password')){
      return next();
    }
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
      if(err){
        return next(err);
      }
      bcrypt.hash(user.password, salt, function(err, hash){
        if(err){
          return next(err);
        }
        //replace clear text password with hashed password
        user.password = hash;
        next();
      });
    });
  });

  userSchema.methods.comparePassword = function(candidatePassword, done){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
      if(err){
        return done(err);
      } else {
        done(null, isMatch);
      }
    });
  };

var userModel = mongoose.model('user', userSchema);

module.exports = userModel;
