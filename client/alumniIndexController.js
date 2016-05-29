angular.module('connectUApp')
  .controller('AlumniIndexController', ['$http', 'ConnectUService', function($http, ConnectUService){
    var vm = this;


    vm.someUsers = ConnectUService.someUsers;
    vm.slackProbe = ConnectUService.slackProbe;

    vm.slackClicked = false;


    vm.showSlackMessage = function (){
      vm.slackClicked = true;
    }

    vm.sendSlackMessage = function (user){
      console.log('clicked sendSlackMessage()');
      vm.slackProbe(user);
      vm.slackClicked = false;
      user.customMessage = '';
    }
    vm.cancelSlackMessage = function(user){
      vm.slackClicked = false;
      user.customMessage = '';
    }

    vm.moreInfo = function(us) {
      // console.log('works');
      vm.slackClicked = false;
      if (vm.expanded != us._id) {
        vm.expanded = us._id;
      } else {
        vm.expanded = null;
      }
    };


  }]);//closes controller
