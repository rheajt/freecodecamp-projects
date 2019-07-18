angular.module('finterest')
.factory('Fins', ['$http', function($http) {

  function getFins() {
    return $http.get('/api/fins');
  }

  function getUserFins(user) {
    return $http.get('/api/fins/' + user);
  }

  function postFin(fin) {
    return $http.post('/api/fins', fin);
  }

  function deleteFin(fin) {
    return $http.delete('/api/fin/' + fin._id);
  }

  function getAllUsers() {
    return $http.get('/api/users/all');
  }

  return {
    getFins: getFins,
    getUserFins: getUserFins,
    postFin: postFin,
    deleteFin: deleteFin,
    getAllUsers: getAllUsers
  }

}]);