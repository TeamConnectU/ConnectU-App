angular.module('connectUApp')
  .controller('TalentPoolController', ['$http', 'ConnectUService', function($http, ConnectUService){
    var vm = this;

    vm.users = ConnectUService.someUsers;
    vm.twentyUsers = ConnectUService.twentyUsers;
    vm.usersSeekingInternship = ConnectUService.usersSeekingInternship;
    vm.usersSeekingEmployment = ConnectUService.usersSeekingEmployment;

    //these are for ng-show to change more button to get more data from correct array
    vm.allSelected = true;
    vm.intSelected = false;
    vm.empSelected = false;



    vm.switchToAll = function(){
      console.log('switchToAll clicked');
      vm.allSelected = true;
      vm.intSelected = false;
      vm.empSelected = false;
      ConnectUService.get20(ConnectUService.shuffledUsers);
      console.log('twentyUsers in all call:', vm.twentyUsers);
      console.log('shuffledUsers length:', ConnectUService.shuffledUsers.length);

    }

    vm.switchToEmp = function(){
      console.log('switchToEmp clicked');
      vm.allSelected = false;
      vm.intSelected = false;
      vm.empSelected = true;
      console.log('CUS.EMP:', ConnectUService.usersSeekingEmployment);
      ConnectUService.get20(ConnectUService.usersSeekingEmployment);
      console.log('20Users:', vm.twentyUsers);
    }

    vm.switchToInt = function(){
      console.log('switchToInt clicked');
      vm.allSelected = false;
      vm.intSelected = true;
      vm.empSelected = false;
      ConnectUService.get20(ConnectUService.usersSeekingInternship);
    }



  }]);//closes controller
