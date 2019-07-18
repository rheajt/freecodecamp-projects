angular.module('theshortrun')
  .directive('stockBox', [function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'js/shared/stockBox.directive.html',
      link: function(scope, ele, attr) {
        var colors = ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'];

        ele.on('mouseenter', function() {
          ele.css('border', '5px solid ' + colors[scope.$index]);
        });

        ele.on('mouseleave', function() {
          ele.css('border', '5px solid white');
        });
      }
    }
  }])