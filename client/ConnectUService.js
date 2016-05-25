angular.module('connectUApp')
  .factory('ConnectUService', ['$http', function($http){

    var someUsers = {};
    var shuffledUsers = [];
    var usersSeekingInternship = [];
    var usersSeekingEmployment = [];
    var twentyUsers = [];

    console.log('usersSeekingInternship before loop:', usersSeekingInternship);
    console.log('usersSeekingEmployment before loop:', usersSeekingEmployment);

    var getUsers = function(){
      usersSeekingInternship = [];
      usersSeekingEmployment = [];
      console.log('get called');
      $http.get('/users')
      .then(function(response) {
        console.log('response:', response);
        someUsers.info = response.data;
        console.log('someUsers.info before loop:', someUsers.info);

        //creates arrays for sorting in talent pool
        for (var i = 0; i < someUsers.info.length; i++){
          shuffledUsers.push(someUsers.info[i]);
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

        //shuffles lists for Talent pool page
        shuffledUsers = shuffle(shuffledUsers);
        usersSeekingInternship = shuffle(usersSeekingInternship);
        usersSeekingEmployment = shuffle(usersSeekingEmployment);

        console.log('shuffledUsers:', shuffledUsers);
        console.log('usersSeekingInternship after shuffle:', usersSeekingInternship);
        console.log('usersSeekingEmployment after shuffle:', usersSeekingEmployment);

        get20(shuffledUsers);
      });
    }

    getUsers();

    var postUsers = function(userInfo){
      console.log('clicked postUsers', userInfo);
        $http.post('/users/add',  userInfo).then(function(response){
          console.log('$http response', response);
      });
    }


    //The Fisher-Yates shuffle
    var shuffle = function(array) {
      console.log('shuffle called');
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
    var get20 = function(array){
      console.log('get20 called');
      if (array.length > 20){
        var i = 0;
        while (i < 20){
          twentyUsers[i] = array.pop();
          i++;
          console.log('twentyUsers:', twentyUsers);
        }
      } else { //if there are less than 20 to get, get all
        var i = 0;
        while (array.length > 0){
          twentyUsers[i] = array.pop();
          console.log('twentyUsers:', twentyUsers);
          i++;
        }
      }
    }




  return {
    someUsers: someUsers,
    postUsers: postUsers,
    getUsers: getUsers,
    usersSeekingInternship: usersSeekingInternship,
    usersSeekingEmployment: usersSeekingEmployment,
    shuffledUsers: shuffledUsers,
    get20: get20,
    twentyUsers: twentyUsers
  }


}]);//closes app.factory()
