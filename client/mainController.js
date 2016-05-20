angular.module('connectUApp')
  .controller('MainController', ['$http', function($http){

    var vm = this;

// if vm.loggedIn = true - shows Profle and Log Out, if vm.loggedIn = false - shows Alumni login
// MUST ADD IF STATEMENT TO CHANGE TRUE/FALSE
    vm.loggedIn = false;

  }]);
