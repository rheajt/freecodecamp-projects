angular.module('benimadim', [])
  .controller('MainCtrl', ['$scope', '$http', function($scope, $http) {

    function getUser() {
      $http.get('/auth/user').then(function(user) {
        if(user.data.uid) {
          $scope.user = user.data;
        }
      }, function(error) {
        $scope.user = false;
      });
    }

    $scope.turkify = function() {
      $scope.user.original = '//graph.facebook.com/' + $scope.user.uid + '/picture?type=large';
      $scope.user.turkified = 'public/img/turkish.png';
    }

    $scope.finalize = function() {
      $http.post('/api/user/photo', {userPic: $scope.user.original}).then(function(response) {
        console.log(response);
      })
    }
    getUser();

  }])