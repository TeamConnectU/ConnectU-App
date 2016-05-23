angular.module('connectUApp')
  .factory('ConnectUService', ['$http', function($http){

    var someUsers = {};

    var getUsers = function(){
      console.log('get called');
      $http.get('/users')
      .then(function(response) {
        console.log('response:', response);
        someUsers.info = response.data;
        console.log('someUsers.info:', someUsers.info);
      });
    }

    getUsers();


  return {

    someUsers: someUsers
  }


}]);//closes app.factory()
