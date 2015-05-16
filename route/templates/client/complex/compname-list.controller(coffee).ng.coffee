'use strict'

angular.module '<%= appname %>'
.controller '<%= compnameCapped%>ListCtrl', ($scope, $meteor) ->
<% if(pagination){ %>  $scope.page = 1
  $scope.perPage = 3
  $scope.sort = name_sort : 1
  $scope.orderProperty = '1'
  
<% } %>  $scope.<%= compname %> = $meteor.collection<% if(pagination){ %> () ->
    <%= compnameCapped %>.find {}, {sort:$scope.getReactively('sort')}<% } else { %> <%= compnameCapped %><% } %>
  $meteor.autorun $scope, () ->
    $meteor.subscribe('<%= compname %>'<% if(pagination){ %>, {
      limit: parseInt($scope.getReactively('perPage'))
      skip: parseInt(($scope.getReactively('page') - 1) * $scope.getReactively('perPage'))
      sort: $scope.getReactively('sort')
    }, $scope.getReactively('search')<% } %>)<% if(pagination){ %>.then () ->
      $scope.<%= compname %>Count = $meteor.object Counts, 'numberOf<%= compnameCapped %>', false<% } %>
    
  $scope.save = () ->
    if $scope.form.$valid
      $scope.<%= compname %>.save $scope.new<%= compnameCappedSingular %>
      $scope.new<%= compnameCappedSingular %> = undefined
      
  $scope.remove = (<%= compnameSingular %>) ->
    $scope.<%= compname %>.remove <%= compnameSingular %><% if(pagination){ %>
    
  $scope.pageChanged = (newPage) ->
    $scope.page = newPage
    
  $scope.$watch 'orderProperty', () ->
    if $scope.orderProperty
      $scope.sort = name_sort: parseInt($scope.orderProperty)<% } %>