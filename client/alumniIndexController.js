angular.module('connectUApp')
  .controller('AlumniIndexController', ['$http', 'ConnectUService', function($http, ConnectUService){
    var vm = this;

    vm.users = [];
    vm.searchUsers = ['Max, Oliver, Erika, Suzanna'];
    vm.users.push(ConnectUService.user1, ConnectUService.user2, ConnectUService.user3, ConnectUService.user4);



    vm.moreInfo = function(us) {
      console.log('works');
      if (vm.expanded != us.first_name) {
        vm.expanded = us.first_name;
      } else {
        vm.expanded = null;
      }
    };


  }]);//closes controller
