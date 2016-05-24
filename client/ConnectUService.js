angular.module('connectUApp')
  .factory('ConnectUService', ['$http', function($http){

    var someUsers = {};
    var usersSeekingInternship = [];
    var usersSeekingEmployment = [];

    console.log('usersSeekingInternship before loop:', usersSeekingInternship);
    console.log('usersSeekingEmployment before loop:', usersSeekingEmployment);

    var getUsers = function(){
      console.log('get called');
      $http.get('/users')
      .then(function(response) {
        console.log('response:', response);
        someUsers.info = response.data;
        console.log('someUsers.info before loop:', someUsers.info);
        //creates arrays for sorting in talent pool
        for (var i = 1; i < someUsers.info.length; i++){
          if (someUsers.info[i].seeking_internship === true && someUsers.info[i].seeking_employment === true){
            usersSeekingInternship.push(someUsers.info[i]);
            usersSeekingEmployment.push(someUsers.info[i]);
          } else if (someUsers.info[i].seeking_internship === true && someUsers.info[i].seeking_employment === false){
            usersSeekingInternship.push(someUsers.info[i]);
          } else if (someUsers.info[i].seeking_internship === false && someUsers.info[i].seeking_employment === true){
            usersSeekingEmployment.push(someUsers.info[i]);
          }
        }

        console.log('someUsers.info after loop:', someUsers.info);
        console.log('usersSeekingInternship after loop:', usersSeekingInternship);
        console.log('usersSeekingEmployment after loop:', usersSeekingEmployment);
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
    getUsers: getUsers,
    usersSeekingInternship: usersSeekingInternship,
    usersSeekingEmployment: usersSeekingEmployment
  }


}]);//closes app.factory()
