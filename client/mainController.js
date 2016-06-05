angular.module('connectUApp')
  .controller('MainController', ['$http', '$uibModal', 'ConnectUService', function($http, $uibModal, ConnectUService){
    var vm = this;

    // vm.loggedIn = false;

    ConnectUService.getAuth();

    vm.someUsers = ConnectUService.someUsers;
    // console.log("maincontroller", vm.someUsers);

    vm.zip_code = '';
    vm.userInformation = '';

    vm.newUser = {};
    vm.newAdmin = {};
    vm.newUser.internships = [];

    ConnectUService.getAdmin();
    vm.isAdmin = ConnectUService.data.admin;

// if vm.loggedIn = true - shows Profle and Log Out, if vm.loggedIn = false - shows Alumni login
    console.log('pre vm.loggedIn:', vm.loggedIn);
    console.log('ConnectUService.data:', ConnectUService.data);

    vm.loggedIn = ConnectUService.data;
    console.log('after vm.loggedIn:', vm.loggedIn);

    vm.updateUser = function(){
    console.log('updateUser clicked');
    ConnectUService.getUserIdentification();
    vm.userInformation = ConnectUService.userIDResponse;
    // console.log(vm.userInformation);
  };

    vm.updateUser();

    ConnectUService.getValidateData();




    // vm.registerUser = function(){
    //   console.log('vm.newUser from mainController:', vm.newUser);
    //   // console.log('vm.newUser.internships[0] from mainController:', vm.newUser.internships[0]);
    //   // console.log('vm.newUser.internships[1] from mainController:', vm.newUser.internships[1]);
    //
    //   ConnectUService.postUsers(vm.newUser, vm.zip_code);
    //   vm.newUser = {};
    //   // ConnectUService.getUsers();
    // }

    vm.loginAdmin = function(){
      ConnectUService.postAdmin(vm.newAdmin);
      vm.newAdmin = {};
    };

    vm.logIn = function(){
      console.log('clicked login function');


    }


    vm.open = function(alumniInfo) {

      var modalInstance = $uibModal.open({
        templateUrl: 'myProfileModal.html',
        controller: 'ProfileController',
        controllerAs: 'profile',
        resolve: {
          items: function () {
            return alumniInfo;
          }
        }
      });

    };

  }]);
