angular.module('bookwall')
  .directive('bookPanel', [function() {
    return {
      restrict: 'A',
      replace: false,
      link: function(scope, elem, attr) {
        angular.element(elem)
          .on('mouseenter', function() {
            angular.element(elem).find('div').css('display', 'block');
          });
        angular.element(elem)
          .on('mouseleave', function() {
            angular.element(elem).find('div').css('display', 'none');
          });
      }
    }
  }])