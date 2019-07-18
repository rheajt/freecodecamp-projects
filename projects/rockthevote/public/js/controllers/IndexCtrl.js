app.controller('IndexCtrl', ['$scope', '$location', 'User', function($scope, $location, User) {

  function getUser() {
    User.login().then(function(response) {
      $scope.user = response;
    });
  }

  getUser();

}]);