'use strict'

angular.module('<%= appname %>')
.directive('nav', function() {
  return {
    restrict: 'AE',
    templateUrl: 'client/components/nav/nav.view<%if(!jade) {%>.ng<%}%>.html',
    replace: true
  };
});