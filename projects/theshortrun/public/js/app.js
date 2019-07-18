angular.module('theshortrun', ['highcharts-ng'])

  .controller("LineCtrl", ['$scope', 'Data', function($scope, Data) {

    $scope.chartConfig = Data.getChartConfig();

    $scope.stocks = [];

    $scope.error = '';

    var socket = io();

    socket.on('all stocks', function(stocks) {
      if(stocks) {
        stocks.forEach(function(each) {
          loadData(each);
        });
      }
    });

    socket.on('update add stock', function(stock) {
      loadData(stock);
    });

    socket.on('update remove stock', function(stock) {
      $scope.stocks.splice(stock, 1);
      $scope.chartConfig.series.splice(stock, 1);
      $scope.$apply();
    });

    function loadData(data) {

      return Data.getData(data).then(function(response) {
        $scope.chartConfig.series.push({
          name: data.toUpperCase(),
          data: response.reverse()
        });
        $scope.stocks.push(data);
        return true;
      }, function(error) {
        $scope.error = error;
        return false;
      });
    }

    $scope.addStock = function(stock) {
      if(loadData(stock)) {
        socket.emit('add stock', stock.toUpperCase());
      }
      $scope.stock = '';
    }

    $scope.removeStock = function(stock) {
      socket.emit('remove stock', {id: stock, stockName: $scope.stocks[stock]});
    }

  }]);