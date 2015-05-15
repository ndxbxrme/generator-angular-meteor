'use strict'

angular.module '<%= appname %>'
.controller '<%= compnameCapped%>DetailCtrl', ($scope, $stateParams, $meteor) ->
  $scope.item = $meteor.object <%= compnameCapped %>, $stateParams.id, false
  $meteor.subscribe '<%= compname %>'