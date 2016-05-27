var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: {type: String, required: true, unique: true},
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  city: {type: String},
  state: {type: String},
  phone: {type: String},
  high_school: {type: String},
  college: {type: String},
  current_workplace: {type: String},
  slack_id: {type: String, required: true},
  linkedin_url: {type: String},
  focus: {type: String},
  quote: {type: String},
  seeking_internship: {type: Boolean},
  seeking_employment: {type: Boolean},
  internship: [{site: String, year: Number}],
  photo_url: {type: String}

});

var userModel = mongoose.model('user', userSchema);

module.exports = userModel;
