var router = require('express').Router();
var path = require('path');
var requestMod = require('request');


router.get('/:zip_code', function(request, response){
  var zip_code = request.params.zip_code;
  requestMod('https://www.zipcodeapi.com/rest/45mWuPAOh4klyjPzRDVrLwuw2gG6CveHAAD5qeUHje2RyRrqvmRhTmNVCu2fZhWA/info.json/'+ zip_code +'/degrees', function(err, res, body){
    if (err){
      response.sendStatus(500);
    } else {
      // console.log(body);
      response.send(body);
    }
  });
});

module.exports = router;
