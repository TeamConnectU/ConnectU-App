var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var internshipSchema = new Schema({
  site: {type: String},
  year: {type: Number}
})

var internship = mongoose.model('internship', internshipSchema);

exports.model = internship;
exports.schema = internshipSchema;
