app.factory('User', ['$http', '$q', function($http, $q) {

  var userInfo;

  function isLoggedIn() {
    if(userInfo) {
      return userInfo;
    } else {
      return $q.reject('Not logged in');
    }
  }

  function getUser() {
    return userInfo;
  }

  function login() {
    var deferred = $q.defer();

    $http.get('/auth/user').then(function(response) {
      if(response.data) {
        // console.log(response.data);
        userInfo = response.data;
        deferred.resolve(userInfo);
      } else {
        deferred.reject('Not logged in');
      }
    });

    return deferred.promise;

  }

  return {
    login: login,
    getUser: getUser,
    isLoggedIn: isLoggedIn
  }

}])