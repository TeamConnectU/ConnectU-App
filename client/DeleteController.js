angular.module('connectUApp')
  .controller('DeleteController', ['ConnectUService','$uibModalInstance','deleteItems', function(ConnectUService, $uibModalInstance, deleteItems){
    var vm = this;
    vm.us = deleteItems;

    vm.removeUser = function(us){
      ConnectUService.deleteUser(us);
      vm.cancel();
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };


  }]);
