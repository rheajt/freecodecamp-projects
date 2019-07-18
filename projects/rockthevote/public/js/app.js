var app = angular.module('rockthevoteApp', ['ngRoute', 'chart.js']);

app.run(['$rootScope', '$location', function($rootScope, $location) {
  //If the route change failed due to authentication error, redirect them out
  $rootScope.$on('$routeChangeError', function(event, current, previous, rejection) {
    if(rejection === 'Not logged in') {
      $location.path('/');
    }
  })
}]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'public/views/index.html',
      controller: 'MainCtrl'
    })
    .when('/poll/:pollId', {
      templateUrl: 'public/views/poll.html',
      controller: 'PollCtrl'
    })
    .when('/new', {
      templateUrl: 'public/views/new.html',
      controller: 'NewCtrl',
      resolve: {
        auth: function(User) {
          return User.isLoggedIn();
        }
      }
    })
    .when('/polls/all', {
      templateUrl: 'public/views/allpolls.html',
      controller: 'MainCtrl'
    })
    .when('/polls/my', {
      templateUrl: 'public/views/mypolls.html',
      controller: 'MypollsCtrl',
      resolve: {
        auth: function(User) {
          return User.isLoggedIn();
        }
      }
    })
    .otherwise({
      redirectTo: '/'
    })
}]);
