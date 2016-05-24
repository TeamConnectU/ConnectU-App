git angular.module('connectUApp')
  .controller('TalentPoolController', ['$http', 'ConnectUService', function($http, ConnectUService){
    var vm = this;

    vm.user4 = ConnectUService.user4;

    vm.users = [];
    vm.users.push(ConnectUService.user1, ConnectUService.user2, ConnectUService.user3, ConnectUService.user4);

  }]);//closes controller
