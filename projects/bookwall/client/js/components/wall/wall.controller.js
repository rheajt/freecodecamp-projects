angular.module('bookwall')
  .controller('Wall', ['$scope', 'Auth', 'Book', function($scope, Auth, Book) {
    $scope.user = Auth.currentUser();

    function getAllBooks() {
      Book.all().then(function(response) {

        $scope.books = response.data;

      });
    }

    $scope.removeBook = function(book, ind) {
      // remove the book from books owned
      $scope.books.splice(ind, 1);
      Book.remove(book).then(function(response) {
        $scope.user = Auth.setUser(response.data);
      });

    }

    $scope.updateUser = function(user) {
      Auth.updateUser(user).then(function(response) {
        $scope.user = response.data;
      });
    }

    $scope.requestBook = function(book) {
      // do something to request the book
      Book.request(book).then(function(resposne) {
        console.log(response);
      })
    }

    $scope.search = function(book) {
      Book.search(book).then(function(books) {
        $scope.bookSearch = '';
        $scope.searchResults = books.filter(function(each) {
          return $scope.user.booksOwned.indexOf(each._id) === -1;
        });
      });
    }

    $scope.addBook = function(book) {
      $scope.user.booksOwned.push(book._id);
      Book.add(book).then(function() {
        getAllBooks();
        $scope.currentPanel = 'wall'
      });
    }

    getAllBooks();

  }]);