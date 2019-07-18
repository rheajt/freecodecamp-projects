angular.module('finterest')
.controller('Main', ['$scope', '$http', function($scope, $http) {

  $http.get('/api/fins').then(function(response) {
    $scope.photos = response.data;
  });

}])