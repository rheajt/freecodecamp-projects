angular.module('bookwall', ['ngRoute'])
  .run(['$rootScope', '$location', function($rootScope, $location) {

    $rootScope.$on('$routeChangeError', function(event, current, previous, rejection) {
      if(rejection.data === 'Forbidden') {
        console.log('rejected');
        $location.path('/');
      }
    });
  }])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'js/components/index/index.html',
        controller: 'Index'
      })
      .when('/wall', {
        templateUrl: 'js/components/wall/wall.html',
        controller: 'Wall',
        resolve: {
          auth: function(Auth) {
            return Auth.getCurrentUser();
          }
        }
      })
      .when('/add', {
        templateUrl: 'js/components/add/add.html',
        controller: 'Add',
        resolve: {
          auth: ['Auth', function(Auth) {
            return Auth.getCurrentUser();
          }]
        }
      })
      .when('/bookshelf', {
        templateUrl: 'js/components/bookshelf/bookshelf.html',
        controller: 'Bookshelf',
        resolve: {
          auth: ['Auth', function(Auth) {
            return Auth.getCurrentUser();
          }]
        }
      })
      .otherwise({
        redirectTo: '/'
      });

    // $locationProvider.html5Mode = true;
  }]);


