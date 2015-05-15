'use strict'

angular.module '<%= appname %>'
.controller '<%= compnameCapped%>ListCtrl', ($scope) ->
  $scope.page = 1
  $scope.perPage = 3
  $scope.sort = name : 1
  
  $scope.<%= compname %> = $meteor.collection ->
    <%= compnameCapped %>.find {},
      sort: $scope.getReactively('sort')
      
  $meteor.autorun $scope, ->
    $meteor.subscribe('<%= compname %>', {
      limit: parseInt($scope.getReactively('perPage'))
      skip: parseInt(($scope.getReactively('page') -1) * $scope.getReactively('perPage'))
      sort: $scope.getReactively('sort')
    }, $scope.getReactively('search')).then ->
      $scope.<%= compname %>Count = $meteor.object Counts, 'numberOf<%= compnameCapped %>', false
  
  $scope.pageChanged = (newPage) ->
    $scope.page = newPage