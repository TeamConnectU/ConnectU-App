// var mongoose = require('mongoose');
// var encryptLib = require('../auth/encryption');
// var Schema = mongoose.Schema;
//
// var SALT_WORK_FACTOR = 10;
//
// var adminSchema = new Schema({
//     email: {type: String, required: true, unique: true},
//     password: {type: String, required: true, unique: true}
//   });
//
//   adminSchema.pre('save', function(next){
//     console.log('running pre save user function');
//     var user = this;
//     //if password has not changed, do not proceed
//     if(!admin.isModified('password')){
//       return next();
//     }
//     bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
//       if(err){
//         return next(err);
//       }
//       bcrypt.hash(admin.password, salt, function(err, hash){
//         if(err){
//           return next(err);
//         }
//         //replace clear text password with hashed password
//         admin.password = hash;
//         next();
//       });
//     });
//   });
//
//   adminSchema.methods.comparePassword = function(candidatePassword, done){
//     bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
//       if(err){
//         return done(err);
//       } else {
//         done(null, isMatch);
//       }
//     });
//   };
//
//   var admin = mongoose.model('admin', adminSchema);
//
// module.exports = admin;
