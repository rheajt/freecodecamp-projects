app.controller('MainCtrl', ['$scope', '$location', '$routeParams', 'Vote', function($scope, $location, $routeParams, Vote) {


  function getPolls() {
    Vote.getPolls().then(function(response) {
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

  getPolls();

}])