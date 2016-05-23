angular.module('connectUApp')
  .controller('AlumniIndexController', ['$http', 'ConnectUService', function($http, ConnectUService){
    var vm = this;


    vm.someUsers = ConnectUService.someUsers;



    vm.moreInfo = function(us) {
      console.log('works');
      if (vm.expanded != us._id) {
        vm.expanded = us._id;
      } else {
        vm.expanded = null;
      }
    };


  }]);//closes controller
