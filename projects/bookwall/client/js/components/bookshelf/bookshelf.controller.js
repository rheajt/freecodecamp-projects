angular.module('bookwall')
  .controller('Bookshelf', ['$scope', 'Auth', 'Book', function($scope, Auth, Book) {

    $scope.user = Auth.currentUser();

    $scope.pageClass = 'minus';

    Book.myBooks().then(function(response) {
      $scope.books = response.data;
    });

    $scope.updateUser = function(user) {
      Auth.updateUser(user).then(function(response) {
        $scope.user = response.data;
      });
    }

    $scope.clickFunction = function(book) {
      // remove the book from books owned
      console.log(book);
      Book.remove(book).then(function(response) {
        $scope.books = response.data;
        console.log(response);
      });

    }

  }])