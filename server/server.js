var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[ LOCAL ROUTES ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
var indexRouter = require('./routes/index.js');




//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[ EXPRESS ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));


app.use('/', indexRouter);




var server = app.listen(process.env.PORT || 3000, function(){
  var port = server.address().port;
  console.log('Listening on port:', port + ". Press ctrl-c to end.");
});
