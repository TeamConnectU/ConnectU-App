angular.module('connectUApp')
        .controller('AdminRegisterController', ['ConnectUService', '$uibModalInstance', 'items', function (ConnectUService, $uibModalInstance, items) {
          var vm = this;
          vm.regAdmin = {"admin": true};
          vm.registerAdmin = function(){
            console.log("registerAdmin", vm.regAdmin);
            ConnectUService.brandNewAdmin(vm.regAdmin);
            vm.regAdmin={};
            vm.cancel();
          };


          vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
          };

        }]);
