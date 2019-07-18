app.controller('PollCtrl', ['$scope', '$routeParams', 'Vote', 'User', function($scope, $routeParams, Vote, User) {

  function getPoll() {

    Vote.getPoll($routeParams.pollId).then(function(response) {
      $scope.poll = response.data;
    })
  }

  $scope.castVote = function(answer) {
    var data = {
      voteId: answer
    }
    Vote.putPoll(data).then(function(response) {
      if(response.data) {
        $scope.poll = response.data;
      }
    })
  }

  $scope.addAnswer = function(newAns) {
    var data = {
      pollId: $scope.poll._id,
      answer: newAns
    }
    Vote.putPoll(data).then(function(response) {
      if(response.data) {
        $scope.poll = response.data;
      }
    });
    $scope.newAnswer = '';
  }

  $scope.loggedIn = User.getUser();

  getPoll();

}])