angular.module('finterest')
.controller('Navbar', ['$scope', 'Auth', function($scope, Auth) {

  Auth.getUser().then(function(user) {
    $scope.user = user;
  })

}])