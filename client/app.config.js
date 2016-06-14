angular.module('connectUApp')
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'views/partials/talentPool.html',
        controller: 'TalentPoolController',
        controllerAs: 'talent'
      })
      .when('/alumniIndex', {
        templateUrl: 'views/partials/alumniIndex.html',
        controller: 'AlumniIndexController',
        controllerAs: 'alumni'
      });


  $locationProvider.html5Mode(true);

  if( window.location.hash == '#!' ) {
  window.location.href = 'http://localhost:3000';
  }

}]);//closes app.config()
