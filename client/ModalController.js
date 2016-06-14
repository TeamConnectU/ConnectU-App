angular.module('connectUApp')
        .controller('ModalController', ['ConnectUService', '$uibModalInstance', 'items', function (ConnectUService, $uibModalInstance, items) {
            var vm = this;

            vm.newAdmin = {};

            vm.cancel = function() {
              ConnectUService.postAdmin(vm.newAdmin);
              vm.newAdmin = {};
              $uibModalInstance.dismiss('cancel');
            };




        }]);
