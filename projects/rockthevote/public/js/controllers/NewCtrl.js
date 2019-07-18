app.controller('NewCtrl', ['$scope', '$location', 'Vote', function($scope, $location, Vote) {

  $scope.submit = function(newPoll) {
    newPoll.answer = $scope.choice;
    console.log(newPoll);
    Vote.postPoll(newPoll).then(function(response) {
      $location.path('/poll/' + response.data._id);
    });
  }

}])