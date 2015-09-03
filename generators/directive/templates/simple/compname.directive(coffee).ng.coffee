'use strict'

angular.module '<%= appname %>'
.directive '<%= compname %>', ->
  {
    restrict: 'EA'
    link: (scope, elem, attrs) ->
      scope.property = '<%=compname%>'
  }
