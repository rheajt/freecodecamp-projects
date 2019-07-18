angular.module('finterest', ['ngRoute', 'akoenig.deckgrid'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/index.partial.html',
        controller: 'Main'
      })
      .when('/fins/:user', {
        templateUrl: 'partials/myfins.partial.html',
        controller: 'MyFins'
      })
      .when('/explore', {
        templateUrl: 'partials/explore.partial.html',
        controller: 'Explore'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);