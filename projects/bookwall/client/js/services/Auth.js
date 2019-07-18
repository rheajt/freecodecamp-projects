angular.module('bookwall')
  .factory('Auth', ['$http', '$q', function($http, $q) {
    var user = false;

    function getCurrentUser() {
      if(user) {
        return user;
      } else {

        var deferred = $q.defer();

        $http.get('/api/currentUser').then(function(data) {
          if(data) {
            user = data.data;
            deferred.resolve(data);
          } else {
            deferred.reject('Not authorized');
          }
        }, function(error) {
          deferred.reject(error);
        });

        return deferred.promise;

      }
    }

    function updateUser(user) {
      return $http.put('/api/updateUser', user);
    }

    function setUser(updatedUser) {
      user = updatedUser;
      return user;
    }

    function currentUser() {
      return user;
    }

    return {
      getCurrentUser: getCurrentUser,
      currentUser: currentUser,
      updateUser: updateUser,
      setUser: setUser
    }
  }])