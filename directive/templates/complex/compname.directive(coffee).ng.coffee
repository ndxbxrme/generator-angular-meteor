'use strict'

angular.module '<%= appname %>'
.directive '<%= compname %>', () ->
  {
    restrict: 'EA'
    templateUrl: '<%= dir %>/<%= compname %>.view.html'
    replace: true
    link: (scope, elem, attrs) ->
      scope.property = '<%=compname%>'
  }