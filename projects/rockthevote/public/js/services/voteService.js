app.factory('Vote', ['$http', function($http) {
  return {
    getPolls: function() {
      return $http.get('/api/polls');
    },
    getMyPolls: function() {
      return $http.get('/api/polls/my');
    },
    getPoll: function(id) {
      return $http.get('/api/polls/' + id);
    },
    postPoll: function(newPoll) {
      return $http.post('/api/polls', newPoll);
    },
    putPoll: function(data) {
      return $http.put('/api/polls/vote', data);
    },
    deletePoll: function(id) {
      return $http.delete('/api/polls/' + id);
    }
  }

}])