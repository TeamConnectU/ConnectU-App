angular.module('connectUApp')
  .controller('TalentPoolController', ['$http', 'ConnectUService', function($http, ConnectUService){
    var vm = this;

    vm.user4 = ConnectUService.user4;

  }]);//closes controller
