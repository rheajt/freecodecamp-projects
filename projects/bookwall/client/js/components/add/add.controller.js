angular.module('bookwall')
  .controller('Add', ['$scope', '$location', 'Auth', 'Book', function($scope, $location, Auth, Book) {

    $scope.user = Auth.currentUser();

    $scope.search = function(book) {
      Book.search(book).then(function(books) {
        $scope.book = '';
        $scope.books = books.filter(function(each) {
          return $scope.user.booksOwned.indexOf(each._id) === -1;
        });
      });
    }

    $scope.addBook = function(book) {
      $scope.user.booksOwned.push(book._id);
      Book.add(book).then(function() {
        $location.path('/wall');
      });
    }

  }]);