angular.module('bookwall')
  .service('Book', ['$http', '$q', function($http, $q) {

    this.all = function() {
      return $http.get('/api/books');
    }

    this.myBooks = function() {
      return $http.get('/api/my/books');
    }

    this.search = function(book) {
      var deferred = $q.defer();

      $http.post('/api/book/search', {query: book}).then(function(response) {
        deferred.resolve(response.data);
      });

      return deferred.promise;
    }

    this.add = function(book) {
      return $http.post('/api/book/add', {book: book});
    }

    this.request = function(book) {
      return $http.put('/api/book/request', book);
    }

    this.remove = function(book) {
      return $http.post('/api/book/remove', {book: book});
    }

  }]);