var router = require('express').Router();
var path = require('path');


router.get('/', function(request, response){
  // response.send('Hello from index router!');
  response.sendFile(path.join(__dirname, '../public/views/main.html'));

});

// router.get('/*', function(request, response, next){
//   console.log('authenitcate catch-all');
//   if(request.isAuthenticated()){
//     userId = request.user.id;
//     console.log(userId);
//     next();
//   } else {
//     response.redirect('/');
//   }
// })

module.exports = router;
