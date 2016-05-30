angular.module('connectUApp')
  .controller('AlumniIndexController', ['$http', '$uibModal', 'ConnectUService', function($http, $uibModal, ConnectUService){
    var vm = this;


    vm.someUsers = ConnectUService.someUsers;
    vm.slackProbe = ConnectUService.slackProbe;

    vm.slackClicked = false;
    vm.isAdmin = true;

    vm.deletePressed = function(us){
      console.log('deletePressed');

      var modalInstance = $uibModal.open({
        animation: vm.animationsEnabled,
        templateUrl: 'myModalContent2.html',
        controller: 'DeleteController',
        controllerAs: 'remove',
        resolve: {
          deleteItems: function () {
            return us;
          }
        }
    });
  };


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
