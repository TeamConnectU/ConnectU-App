angular.module('connectUApp')
        .controller('ModalController', ['$uibmodalInstance', function ($uibmodalInstance) {
            var vm = this;

            vm.ok = function() {
              $uibmodalInstance.close(vm.form);
            };

        //     vm.cancel = function() {
        //       $uibModalInstance.dismiss('cancel');
        //     };

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
