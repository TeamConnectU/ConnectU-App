angular.module('connectUApp')
        .controller('ModalController', ['ConnectUService', '$uibModalInstance', 'items', function (ConnectUService, $uibModalInstance, items) {
            var vm = this;

            vm.newAdmin = {};

            vm.cancel = function() {
              ConnectUService.postAdmin(vm.newAdmin);
              vm.newAdmin = {};
              $uibModalInstance.dismiss('cancel');
            };

            // $http.post('/auth', adminInfo).then(function(response){
            //     data.loggedIn = true;
            //     getAdmin();
            //     console.log(response);
            // });

            // var postAdmin = function(adminInfo){
            //   console.log('adminInfo', adminInfo);
            //   $http.post('/auth', adminInfo).then(function(response){
            //     data.loggedIn = true;
            //     getAdmin();
            //     console.log(response);

            //   });
            // };



        }]);
