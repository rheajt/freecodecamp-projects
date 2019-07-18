angular.module('finterest')
.controller('MyFins', ['$scope', '$routeParams', 'Fins', 'Auth', function($scope, $routeParams, Fins, Auth) {
  $scope.userPage = $routeParams.user;

  Auth.getUser().then(function(response) {
    $scope.user = response;
  });

  $scope.addFin = function(fin) {
    Fins.postFin(fin).then(function(response) {
      $scope.fin.url = '';
      getUserFins();
    });
  }

  $scope.deleteFin = function(fin) {
    Fins.deleteFin(fin).then(function(response) {

      $scope.photos.splice(fin.$index, 1);

    });
  }

  function getUserFins() {
    Fins.getUserFins($scope.userPage).then(function(response) {
      $scope.photos = response.data;
    })
  }

  getUserFins();

}]);