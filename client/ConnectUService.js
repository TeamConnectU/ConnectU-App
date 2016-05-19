angular.module('connectUApp')
  .factory('ConnectUService', function(){
  var test = 'hello test';


  return {
    test: test
  }


});//closes app.factory()
