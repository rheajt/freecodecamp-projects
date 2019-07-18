angular.module('theshortrun')
  .factory('Data', ['$http', '$q', function($http, $q) {
    var stocks = ['AAPL'];

    function getData(data) {
      var today = new Date();

      var api = 'https://query.yahooapis.com/v1/public/yql?q=';
      var params = '&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';
      var query = 'select Date, Close from yahoo.finance.historicaldata where symbol = "' + data + '" and startDate = "' + (today.getFullYear() - 1) + '-0' + (today.getMonth() + 1) + '-0' + today.getDate() + '" and endDate = "2016-03-07"';
      var deferred = $q.defer();

      $http.get(api + encodeURIComponent(query) + params).then(function(response) {
        if(response.data.query.results) {
          var mappedData = response.data.query.results.quote.map(function(each) {
            var split = each['Date'].split('-');
            var date = new Date(split[0], split[1] - 1, split[2]);

            return [date.getTime(), +each['Close']];
          });

          deferred.resolve(mappedData);
        } else {
          deferred.reject('No results');
        }
      });

      return deferred.promise;
    }

    function getChartConfig() {
      return {
        options: {
            chart: {
                zoomType: 'x'
            },
            rangeSelector: {
                enabled: true,
                selected: 0
            },
            navigator: {
                enabled: true
            }
        },
        series: [],
        title: {
          text: '<h1 class="chart-title">THE SHORT RUN <small>because in the long run, everyone is dead.</small></h1>',
          useHTML: true,
          align: 'left'
        },
        useHighStocks: true
      }
    }

    return {
      getData: getData,
      getChartConfig: getChartConfig
    }
  }])