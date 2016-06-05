angular.module('connectUApp')
  .controller('AlumniIndexController', ['$http', '$uibModal', 'ConnectUService', function($http, $uibModal, ConnectUService){
    var vm = this;

    // ConnectUService.getAdmin();

    vm.someUsers = ConnectUService.someUsers;
    // vm.slackProbe = ConnectUService.slackProbe;

    vm.slackClicked = false;
    vm.isAdmin = ConnectUService.data.admin;
    vm.isCollapsed = !ConnectUService.data.admin;


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
      ConnectUService.slackProbe(user);
      vm.slackClicked = false;
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
