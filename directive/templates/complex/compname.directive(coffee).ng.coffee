'use strict'

angular.module '<%= appname %>'
.directive '<%= compname %>', () ->
  {
    restrict: 'EA'
    templateUrl: '<%= templateurl %>'
    replace: true
    link: (scope, elem, attrs) ->
      scope.property = '<%=compname%>'
  }