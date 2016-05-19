angular.module('connectUApp')
  .controller('AlumniIndexController', ['$http', 'ConnectUService', function($http, ConnectUService){
    var vm = this;

    vm.user4 = ConnectUService.user4;
    console.log(vm.user4);

  }]);//closes controller
