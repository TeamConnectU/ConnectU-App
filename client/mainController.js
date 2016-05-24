angular.module('connectUApp')
  .controller('MainController', ['$http', 'ConnectUService', function($http, ConnectUService){
    var vm = this;

    vm.someUsers = ConnectUService.someUsers

    vm.newUser = {};


// if vm.loggedIn = true - shows Profle and Log Out, if vm.loggedIn = false - shows Alumni login
// MUST ADD IF STATEMENT TO CHANGE TRUE/FALSE
    vm.loggedIn = false;

    vm.registerUser = function(){
      console.log('clicked');
      console.log(vm.newUser);
      ConnectUService.postUsers(vm.newUser);
      vm.newUser = {};
      ConnectUService.getUsers();
    }

  }]);
