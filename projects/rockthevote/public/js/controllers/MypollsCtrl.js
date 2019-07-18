app.controller('MypollsCtrl', ['$scope', '$location', 'Vote', function($scope, $location, Vote) {

  function getMyPolls() {
    Vote.getMyPolls().then(function(response) {
      $scope.polls = response.data.map(function(each) {
        return {
          id: each._id,
          question: each.question,
          data: each.responses.map(function(resp) {
            return resp.votes;
          }),
          labels: each.responses.map(function(resp) {
            return resp.answer;
          })
        }
      })
    });
  }

  $scope.viewPoll = function(pollId) {
    $location.path('/poll/' + pollId);
  }

  $scope.deletePoll = function(id) {
    Vote.deletePoll(id).then(function(response) {
      getMyPolls();
    })
  }

  getMyPolls();

}])