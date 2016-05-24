angular.module('connectUApp')
  .factory('ConnectUService', ['$http', function($http){

    var someUsers = {};
    // var newUser = {};

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


    var postUsers = function(userInfo){
      console.log('clicked postUsers', userInfo);
        $http.post('/users/add',  userInfo).then(function(response){
          console.log('$http response', response);
      });
    }


  return {
    someUsers: someUsers,
    postUsers: postUsers,
    getUsers: getUsers
  }


}]);//closes app.factory()
