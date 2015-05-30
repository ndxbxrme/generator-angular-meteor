'use strict'

angular.module '<%= appname %>'
.controller '<%= compnameCapped%>Ctrl', ['$scope', ($scope) ->
  $scope.viewName = '<%= compnameCapped %>'
]