'use strict';

angular.module('<%= appname %>')
.directive('<%= compname %>', function() {
  return {
    restrict: 'EA',
    link: function(scope, elem, attrs) {
      scope.property = '<%=compname%>';
    }
  }
});