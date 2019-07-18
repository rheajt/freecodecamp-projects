var app = angular.module('NightlifeApp', ['ngRoute', 'ngCookies']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'public/js/partials/mainView.html',
      controller: 'MainCtrl'
    })
    .when('/friends', {
      templateUrl: 'public/js/partials/friendsView.html',
      controller: 'FriendsCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});

app.value('userData', {
  isAuthenticated: false,
  facebook: {},
  goingTo: {}
});

app.service('User', function($http) {

  this.getProfile = function() {
    return $http.get('/auth/profile');
  };

  this.logout = function() {
    return $http.get('/auth/logout');
  }

  this.goingTonight = function(bar) {
    return $http.put('/auth/profile', {goingTo: bar});
  }

  this.notGoingTonight = function() {
    return $http.delete('/auth/profile');
  }

  this.friends = function() {
    return $http.get('/api/friends');
  }

});


app.service('Yelp', function($http, $cookies) {

  this.searchResults = [];

  this.search = function(query) {
    if(query.location) {
      $cookies.putObject('lastSearch', query);
    }
    return $http.post('/api/yelp', $cookies.getObject('lastSearch'));
  }

  this.getResults = function() {
    return this.searchResults;
  }

  this.setResults = function(results) {
    this.searchResults = results;
  }
});



app.controller('NavbarCtrl', function($scope, $location, User, userData) {

  User.getProfile().success(function(response) {
    if(response.facebook) {
      userData.isAuthenticated = true;
      userData.facebook = response.facebook;
      userData.goingTo = response.goingTo;
    } else {
      $location.path('/');
    }
  });

  $scope.logout = function() {
    User.logout().success(function(response) {
      userData.isAuthenticated = false;
      userData.displayName = '';
      $location.path('/');
    });
  };

  $scope.userData = userData;
});

app.controller('MainCtrl', function($scope, userData, Yelp, User) {

  $scope.userData = userData;

  $scope.search = function(loc) {
    Yelp.search({location: loc}).success(function(response) {
      //console.log(response);
      Yelp.setResults(response.businesses);
      $scope.results = Yelp.getResults();
    }).error(function(response) {
      // console.log(response);
      $scope.results = response.error.text;
    });
  };
  $scope.search(null);

  $scope.goingTonight = function(business) {
    User.goingTonight(business.name).success(function(response) {
      $scope.barName = response.goingTo.barName;
    });
  };

});

app.controller('FriendsCtrl', function($scope, $location, userData, User) {

  $scope.userData = userData;

  User.friends().success(function(response) {
    $scope.friends = response;
  });

  $scope.notGoing = function(bar) {
    User.notGoingTonight().success(function(response) {
      $location.path('/');
    });
  }
});