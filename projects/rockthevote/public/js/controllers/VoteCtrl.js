app.controller('VoteCtrl', ['$scope', 'Vote', function($scope, Vote) {

  Vote.getPolls().then(function(data) {
    $scope.votes = data;
  });

}])