angular.module('bookwall')
  .directive('navigation', [function() {
    return {
      restrict: 'E',
      templateUrl: 'js/directives/navigation.html',
      controller: ['$scope', '$location', function($scope, $location) {
        $scope.location = $location;
      }]
    }
  }])