angular.module('connectUApp')
  .controller('ProfileController', ['ConnectUService','$uibModalInstance','items', function(ConnectUService, $uibModalInstance, items){
    var vm = this;
    vm.userInfo = items.data;

    console.log('profile userInfo:', vm.userInfo);

    vm.someUsers = ConnectUService.someUsers;

    //changes required on register form so that single items can be updated if the data already exists
    vm.required = ConnectUService.data.required;
    console.log('vm.required:', vm.required);

    vm.edit = false;

    vm.newUser = {};

    vm.registerUser = function(isValid){
      console.log('vm.newUser from profileController:', vm.newUser);


      ConnectUService.postUsers(vm.newUser, vm.zip_code);
      vm.newUser = {};

    };


    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
      ConnectUService.getUserIdentification();
    };



}]);
