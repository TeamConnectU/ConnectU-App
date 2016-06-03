angular.module('connectUApp')
  .factory('ConnectUService', ['$http', function($http){
    var data = {};
    var someUsers = {};
    data.shuffledUsers = [];
    data.usersSeekingInternship = [];
    data.usersSeekingEmployment = [];
    data.loggedIn = false;
    // data.loggedIn;
    var zipAPIResponse = {};
    var userIDResponse = {};

    var userInformation = '';


    // console.log('usersSeekingInternship before loop:', usersSeekingInternship);
    // console.log('usersSeekingEmployment before loop:', usersSeekingEmployment);

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
      console.log('getAuth called');
    $http.get('auth/loggedIn')
    .then(
      function(response) {
        console.log('getAuth response.data:', response.data);
        data.loggedIn = response.data;
      });
      console.log('data from getAuth function:', data);
    };

    var getUserIdentification = function(user){
      console.log('getUserIdentification Clicked');
      $http.get('auth/getUserId').then(function(response){
        console.log('getUserIdentification', response.data);
        userIDResponse.info = response.data;
        makeSlackCall(user);
      });
    };


    var postUsers = function(userInfo, zip_code){
      console.log('postUsers userInfo:', userInfo);
      $http.get('/getCity/' + zip_code).then(function(response){
        console.log('http get response:', response);
          zipAPIResponse = response.data;
          userInfo.city = zipAPIResponse.city;
          userInfo.state = zipAPIResponse.state;
          $http.put('/users/update', userInfo).then(function(response){
            console.log('http put response:', response);
            console.log('http put userInfo:', userInfo);
          });
          getUsers();
      });
    };

    var postAdmin = function(adminInfo){
      console.log('adminInfo', adminInfo);
      $http.post('/auth', adminInfo).then(function(response){
        console.log(response);
      });
    };

    var deleteUser = function(user){
      console.log('Controller says: Alumni to be deleted is', user);
      id = user._id;
      console.log('/users/remove/' + id);
      $http.delete('/users/remove/' + id).then(function(response){
        console.log('deleted', user);
        getUsers();
      })
    }


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
    }



    var slackProbe = function(user){
      console.log('M3SSAGE', user.customMessage);
      getUserIdentification(user);
    }

    var makeSlackCall = function(user) {
      console.log('userIDResponse:', userIDResponse);
      console.log('userIDResponse.info:', userIDResponse.info);
      console.log('makeSlackCall user:', user);
      var slackSender = userIDResponse.info.first_name+' '+userIDResponse.info.last_name;
      var slackRecipient = user.slack_id;
      var slackMessage = user.customMessage+' --- Please open direct message with me '+userIDResponse.info.slack_id+' to reply!';
      var url = 'https://slack.com/api/chat.postMessage?token=xoxp-3545121647-7271844961-46067180946-8876c76749&channel='+slackRecipient+'&text='+slackMessage+'&username='+slackSender;
      console.log('sending to: ', url);
      $http.post(url).then(function(){
        console.log('message sent');
        user.customMessage = '';
      })
    }


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
    postAdmin: postAdmin
  }


}]);//closes app.factory()
