var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true}

  });

  var adminModel = mongoose.model('admin', adminSchema);

  module.exports = adminModel;
