angular.module('connectUApp')
  .factory('ConnectUService', ['$http', '$location', '$uibModal', function($http, $location, $uibModal){
    var data = {};
    var someUsers = {};
    data.shuffledUsers = [];
    data.usersSeekingInternship = [];
    data.usersSeekingEmployment = [];
    data.loggedIn = false;
    data.admin = false;
    data.required = true;
    var zipAPIResponse = {};
    var userIDResponse = {};


    var getUsers = function(){
      data.shuffledUsers = [];
      data.usersSeekingInternship = [];
      data.usersSeekingEmployment = [];

      // console.log('get called');
      $http.get('/users')
      .then(function(response) {
        // console.log('response:', response);
        someUsers.info = response.data;
        // console.log('someUsers.info before loop:', someUsers.info);

        //creates arrays for sorting in talent pool
        for (var i = 0; i < someUsers.info.length; i++){
          data.shuffledUsers.push(someUsers.info[i]);
          if (someUsers.info[i].seeking_internship === true && someUsers.info[i].seeking_employment === true){
            data.usersSeekingInternship.push(someUsers.info[i]);
            data.usersSeekingEmployment.push(someUsers.info[i]);
          } else if (someUsers.info[i].seeking_internship === true && someUsers.info[i].seeking_employment === false){
            data.usersSeekingInternship.push(someUsers.info[i]);
          } else if (someUsers.info[i].seeking_internship === false && someUsers.info[i].seeking_employment === true){
            data.usersSeekingEmployment.push(someUsers.info[i]);
          }
        }


        //shuffles lists for Talent pool page
        data.shuffledUsers = shuffle(data.shuffledUsers);
        data.usersSeekingInternship = shuffle(data.usersSeekingInternship);
        data.usersSeekingEmployment = shuffle(data.usersSeekingEmployment);


      });
    };

    getUsers();

    var getAuth = function(){

      $http.get('auth/loggedIn')
        .then(
          function(response) {
            data.loggedIn = response.data;
          });

    };

    var getAdmin = function(){

      $http.get('auth/validateAdmin')
        .then(
          function(response) {
            data.admin = response.data;
          });

    };



    var validateData = function(){

      $http.get('auth/validateData')
        .then(
          function(response) {

            var openProfile = response.data;
            data.required = !response.data;

            if(!openProfile) {

              var modalInstance = $uibModal.open({
                templateUrl: 'myProfileModal.html',
                controller: 'ProfileController',
                controllerAs: 'profile',
                backdrop  : 'static',
                keyboard  : false,
                resolve: {
                  items: function () {
                    return userIDResponse.info;
                  }
                }
              });
            } else {
              $location.path('/alumniIndex');
            }
          }
        );
    };

    var getUserIdentification = function(user){
      $http.get('auth/getUserId').then(function(response){
        userIDResponse.info = response.data;
        makeSlackCall(user);
      });
    };

    var modalUpdate = function(){
      validateData();
      return $http.get('auth/getUserId');
    };


    var postUsers = function(userInfo, zip_code){
      $http.get('/getCity/' + zip_code).then(function(response){
          zipAPIResponse = response.data;
          userInfo.city = zipAPIResponse.city;
          userInfo.state = zipAPIResponse.state;
          $http.put('/users/update', userInfo).then(function(response){
            getUsers();
            $location.path('/alumniIndex');
          });
      });
    };

    var postAdmin = function(adminInfo){
      $http.post('/auth', adminInfo).then(function(response){
        data.loggedIn = true;

        getAdmin();

      });
    };

    var brandNewAdmin = function(newAdminInfo){
      $http.post('/auth/register', newAdminInfo).then(function(response){
      });
    };

    var deleteUser = function(user){
      id = user._id;
      $http.delete('/users/remove/' + id).then(function(response){
        getUsers();
      });
    };


    //The Fisher-Yates shuffle
    var shuffle = function(array) {
      // console.log('shuffle called');
      var tempArr = array;
      var m = tempArr.length, t, i;

      // While there remain elements to shuffle…
      while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = tempArr[m];
        tempArr[m] = tempArr[i];
        tempArr[i] = t;
      }

      return tempArr;
    };



    var slackProbe = function(user){
      getUserIdentification(user);
    };

    var makeSlackCall = function(user) {
      var slackSender = userIDResponse.info.first_name+' '+userIDResponse.info.last_name;
      var slackRecipient = user.slack_id;
      var slackMessage = user.customMessage+' --- Please open direct message with me '+userIDResponse.info.slack_id+' to reply!';
      var url = 'https://slack.com/api/chat.postMessage?token=xoxp-3545121647-7271844961-48522715751-e94f1eba23&channel='+slackRecipient+'&text='+slackMessage+'&username='+slackSender;
      $http.post(url).then(function(){
        user.customMessage = '';
      });
    };


  return {
    someUsers: someUsers,
    postUsers: postUsers,
    getUsers: getUsers,
    deleteUser: deleteUser,
    data: data,
    slackProbe: slackProbe,
    getAuth: getAuth,
    getUserIdentification: getUserIdentification,
    userIDResponse: userIDResponse,
    postAdmin: postAdmin,
    getValidateData: validateData,
    getAdmin: getAdmin,
    modalUpdate: modalUpdate,
    brandNewAdmin: brandNewAdmin
  };


}]);//closes app.factory()
