angular.module('connectUApp')
  .controller('TalentPoolController', ['$http', '$uibModal', 'ConnectUService', function($http, $uibModal, ConnectUService){
    var vm = this;

    // vm.users = ConnectUService.someUsers;
    vm.data = ConnectUService.data.shuffledUsers;
    console.log('vm.data:', vm.data);


    //these are for ng-show to change more button to get more data from correct array
    vm.allSelected = true;
    vm.intSelected = false;
    vm.empSelected = false;

    //pagination functionality
    vm.totalItems = vm.data.length;
    vm.currentPage = 1;
    vm.viewby = 20;
    vm.viewbyArray = [20, 40, 60, 80];
    vm.maxSize = 2;
    vm.itemsPerPage = vm.viewby;


    //pagination functions
  vm.setPage = function (pageNo) {
    vm.currentPage = pageNo;
  };

  vm.pageChanged = function() {
    console.log('Page changed to: ' + vm.currentPage);
  };

  vm.setItemsPerPage = function(num) {
  vm.itemsPerPage = num;
  vm.currentPage = 1; //reset to first page
}
  //end of pagination functions


    //filter functions
    vm.switchToAll = function(){
      console.log('switchToAll clicked');
      vm.allSelected = true;
      vm.intSelected = false;
      vm.empSelected = false;
      vm.currentPage = 1;
      vm.data = ConnectUService.data.shuffledUsers;
    }

    vm.switchToEmp = function(){
      console.log('switchToEmp clicked');
      vm.allSelected = false;
      vm.intSelected = false;
      vm.empSelected = true;
      vm.currentPage = 1;
      vm.data = ConnectUService.data.usersSeekingEmployment;
    }

    vm.switchToInt = function(){
      console.log('switchToInt clicked');
      vm.allSelected = false;
      vm.intSelected = true;
      vm.empSelected = false;
      vm.currentPage = 1;
      vm.data = ConnectUService.data.usersSeekingInternship;
    }
    //end of filter functions


    vm.open = function (alumni) {

      var modalInstance = $uibModal.open({
        animation: vm.animationsEnabled,
        templateUrl: 'myModalContent.html',
        controller: 'IndividualDetailController',
        controllerAs: 'detail',
        resolve: {
          items: function () {
            return alumni;
          }
        }
      });

    };


}]);//closes controller
