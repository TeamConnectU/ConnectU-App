angular.module('connectUApp')
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider
      .when('/talentPool', {
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

  }]);//closes app.config()
