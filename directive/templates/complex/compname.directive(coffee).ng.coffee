'use strict'

angular.module '<%= appname %>'
.directive '<%= compname %>', [() ->
  {
    restrict: 'EA'
    templateUrl: '<%= dir %>/<%= compname %>.view<%if(!jade) {%>.ng<%}%>.html'
    replace: true
    link: (scope, elem, attrs) ->
      scope.property = '<%=compname%>'
  }
]