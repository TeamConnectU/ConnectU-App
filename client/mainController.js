angular.module('connectUApp')
  .controller('MainController', ['$http', 'ConnectUService', function($http, ConnectUService){
    var vm = this;

    vm.someUsers = ConnectUService.someUsers;
    console.log("maincontroller", vm.someUsers);

    vm.zip_code = '';

    vm.newUser = {};


// if vm.loggedIn = true - shows Profle and Log Out, if vm.loggedIn = false - shows Alumni login
// MUST ADD IF STATEMENT TO CHANGE TRUE/FALSE
    vm.loggedIn = false;

    vm.registerUser = function(){
      console.log('clicked');
      console.log(vm.newUser);
      ConnectUService.postUsers(vm.newUser, vm.zip_code);
      vm.newUser = {};
      ConnectUService.getUsers();
    }

  }]);
