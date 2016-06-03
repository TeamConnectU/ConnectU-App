angular.module('connectUApp')
  .controller('IndividualDetailController', ['ConnectUService','$uibModalInstance','items', function(ConnectUService, $uibModalInstance, items){
    var vm = this;
    vm.alumni = items;

    vm.isCollapsed = false;

    if (vm.alumni.college === ""){
      vm.isCollapsed = true;
    }


    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };



}]);
