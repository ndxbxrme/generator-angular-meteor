'use strict'

angular.module '<%= appname %>'
.controller '<%= compnameCapped%>ListCtrl', ($scope) ->
<% if(pagination){ %>  $scope.page = 1
  $scope.perPage = 3
  $scope.sort = name_sort : 1
  $scope.orderProperty = '1'
  
  $scope.helpers
    <%= compname %>: () ->
      <%= compnameCapped %>.find {},
        sort: $scope.getReactively 'sort'
    <%= compname %>Count: () ->
      Counts.get 'numberOf<%= compnameCapped %>'
      
  $scope.subscribe '<%= compname %>', () ->
    [
      {
        sort: $scope.getReactively 'sort'
        limit: parseInt $scope.getReactively 'perPage'
        skip: ((parseInt $scope.getReactively 'page') - 1) * (parseInt $scope.getReactively 'perPage')
      }
      $scope.getReactively 'search'
    ]      

  $scope.save = () ->
    if $scope.form.$valid
      $scope.<%= compname %>.save $scope.new<%= compnameCappedSingular %>
      $scope.new<%= compnameCappedSingular %> = undefined
      
  $scope.remove = (<%= compnameSingular %>) ->
    $scope.<%= compname %>.remove <%= compnameSingular %>
    
  $scope.pageChanged = (newPage) ->
    $scope.page = newPage
    
  $scope.$watch 'orderProperty', () ->
    if $scope.orderProperty
      $scope.sort = name_sort: parseInt($scope.orderProperty)<% } else { %>
      
  $scope.helpers
    <%= compname %>: () ->
      <%= compnameCapped %>.find {}
      
  $scope.subscribe '<%= compname %>', () ->
    [
      {}
      $scope.getReactively 'search'
    ]     
    
  $scope.save = () ->
    if $scope.form.$valid
      $scope.<%= compname %>.save $scope.new<%= compnameCappedSingular %>
      $scope.new<%= compnameCappedSingular %> = undefined
      
  $scope.remove = (<%= compnameSingular %>) ->
    $scope.<%= compname %>.remove <%= compnameSingular %>      
<% } %>