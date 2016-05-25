var router = require('express').Router();
var path = require('path');
var requestMod = require('request');


router.get('/:zip_code', function(request, response){
  var zip_code = request.params.zip_code;
  requestMod('https://www.zipcodeapi.com/rest/oEbIQxQuA40J0MqKcw09wnim0VwHz52YKdGAKx5lC54DSvn52oezLxWMsst1ywZi/info.json/'+ zip_code +'/degrees', function(err, res, body){
    if (err){
      response.sendStatus(500);
    } else {
      // console.log(body);
      response.send(body);
    }
  });
});

module.exports = router;
