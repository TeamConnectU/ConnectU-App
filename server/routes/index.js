var router = require('express').Router();
var path = require('path');

router.get('/', function(request, response){
  // response.send('Hello from index router!');
  response.sendFile(path.join(__dirname, '../public/views/main.html'));

});

module.exports = router;
