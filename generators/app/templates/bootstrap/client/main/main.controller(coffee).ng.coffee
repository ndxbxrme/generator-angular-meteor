'use strict'

angular.module '<%= appname %>'
.controller 'MainCtrl', ['$scope', '$meteor', ($scope, $meteor) ->
<% if(pagination){ %>  $scope.page = 1
  $scope.perPage = 3
  $scope.sort = name_sort : 1
  $scope.orderProperty = '1'
  
<% } %>  $scope.things = $scope.$meteorCollection<% if(pagination){ %> () ->
    Things.find {}, {sort:$scope.getReactively('sort')}<% } else { %> Things<% } %>
  $meteor.autorun $scope, () ->
    $scope.$meteorSubscribe('things'<% if(pagination){ %>, {
      limit: parseInt($scope.getReactively('perPage'))
      skip: parseInt(($scope.getReactively('page') - 1) * $scope.getReactively('perPage'))
      sort: $scope.getReactively('sort')
    }, $scope.getReactively('search')<% } %>)<% if(pagination){ %>.then () ->
      $scope.thingsCount = $scope.$meteorObject Counts, 'numberOfThings', false<% } %>
    
  $scope.save = () ->
    if $scope.form.$valid
      $scope.things.save $scope.newThing
      $scope.newThing = undefined
      
  $scope.remove = (thing) ->
    $scope.things.remove thing<% if(pagination){ %>
    
  $scope.pageChanged = (newPage) ->
    $scope.page = newPage
    
  $scope.$watch 'orderProperty', () ->
    if $scope.orderProperty
      $scope.sort = name_sort: parseInt($scope.orderProperty)<% } %>
]