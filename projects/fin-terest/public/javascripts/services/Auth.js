angular.module('finterest')
.factory('Auth', ['$http', '$q', function($http, $q) {

  var userData = false;

  function getUser() {
    var deferred = $q.defer();

    if(userData) {
      deferred.resolve(userData);
    } else {
      $http.get('/auth/user').then(function(response) {
        userData = deferred.resolve(response.data);
      }, function(error) {
        deferred.reject(error);
      });
    }

    return deferred.promise;
  }

  function getUserData() {
    return userData;
  }

  return {
    getUser: getUser,
    getUserData: getUserData
  }

}]);