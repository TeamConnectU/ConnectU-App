angular.module('connectUApp')
  .controller('ProfileController', ['ConnectUService','$uibModalInstance','items', function(ConnectUService, $uibModalInstance, items){
    var vm = this;
    vm.userInfo = items;
    console.log('profile userInfo:', vm.userInfo);

    vm.newUser = {};

    vm.registerUser = function(){
      console.log('vm.newUser from profileController:', vm.newUser);
      // console.log('vm.newUser.internships[0] from mainController:', vm.newUser.internships[0]);
      // console.log('vm.newUser.internships[1] from mainController:', vm.newUser.internships[1]);

      ConnectUService.postUsers(vm.newUser, vm.zip_code);
      vm.newUser = {};

    }


    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };



}]);
