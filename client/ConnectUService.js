angular.module('connectUApp')
  .factory('ConnectUService', ['$http', function($http){
    var data = {};
    var someUsers = {};
    data.shuffledUsers = [];
    data.usersSeekingInternship = [];
    data.usersSeekingEmployment = [];
    // data.twentyUsers = [];
    var zipAPIResponse = {};


    // console.log('usersSeekingInternship before loop:', usersSeekingInternship);
    // console.log('usersSeekingEmployment before loop:', usersSeekingEmployment);

    var getUsers = function(){
      // data.usersSeekingInternship = [];
      // data.usersSeekingEmployment = [];
      console.log('get called');
      $http.get('/users')
      .then(function(response) {
        console.log('response:', response);
        someUsers.info = response.data;
        console.log('someUsers.info before loop:', someUsers.info);

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

        console.log('someUsers.info after loop:', someUsers.info);
        console.log('usersSeekingInternship after loop:', data.usersSeekingInternship);
        console.log('usersSeekingEmployment after loop:', data.usersSeekingEmployment);

        //shuffles lists for Talent pool page
        data.shuffledUsers = shuffle(data.shuffledUsers);
        data.usersSeekingInternship = shuffle(data.usersSeekingInternship);
        data.usersSeekingEmployment = shuffle(data.usersSeekingEmployment);

        // console.log('shuffledUsers:', shuffledUsers);
        // console.log('usersSeekingInternship after shuffle:', usersSeekingInternship);
        // console.log('usersSeekingEmployment after shuffle:', usersSeekingEmployment);

        // get20(shuffledUsers);
      });
    };

    getUsers();


    var postUsers = function(userInfo, zip_code){
      console.log('postUsers ran');
      $http.get('/getCity/' + zip_code).then(function(response){
          zipAPIResponse = response.data;
          userInfo.city = zipAPIResponse.city;
          userInfo.state = zipAPIResponse.state;
          $http.post('/users/add', userInfo).then(function(response){
          });
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
    }

    //get 20 to display
    // var get20 = function(array){
    //   console.log('get20 called');
    //   if (array.length > 20){
    //     data.twentyUsers = [];
    //     var i = 0;
    //     while (i < 20){
    //       data.twentyUsers[i] = array.pop();
    //       i++;
    //     }
    //   } else { //if there are less than 20 to get, get all
    //       data.twentyUsers = array;
    //   }
    //   console.log('twentyUsers:', data.twentyUsers);
    // }


    var slackProbe = function(user){
      var slackRecipient = user.slack_id;
      var slackMessage = user.customMessage;
      $http.post('https://slack.com/api/chat.postMessage?token=xoxp-3545121647-7271844961-46067180946-8876c76749&channel='+slackRecipient+'&text='+slackMessage+'&username=ConnectU-BOT').then(function(){
        console.log('message sent');
      })
    }


  return {
    someUsers: someUsers,
    postUsers: postUsers,
    getUsers: getUsers,
    // usersSeekingInternship: usersSeekingInternship,
    // usersSeekingEmployment: usersSeekingEmployment,
    // shuffledUsers: shuffledUsers,
    // get20: get20,
    data: data,
    slackProbe: slackProbe,
  }


}]);//closes app.factory()
