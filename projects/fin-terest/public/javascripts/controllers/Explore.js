angular.module('finterest')
.controller('Explore', ['$scope', 'Fins', function($scope, Fins) {

  Fins.getAllUsers().then(function(response) {
    $scope.allUsers = response.data;
  })
}])