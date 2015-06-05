'use strict'

angular.module('<%= appname %>')
.controller('MainCtrl', function($scope, $meteor) {
<% if(pagination){ %>  $scope.page = 1;
  $scope.perPage = 3;
  $scope.sort = {name_sort : 1};
  $scope.orderProperty = '1';
  
<% } %>  $scope.things = $meteor.collection<% if(pagination){ %>(function() {
    return Things.find({}, {sort:$scope.getReactively('sort')});
  });<% } else { %>(Things);<% } %>
  $meteor.autorun($scope, function() {
    $meteor.subscribe('things'<% if(pagination){ %>, {
      limit: parseInt($scope.getReactively('perPage')),
      skip: parseInt(($scope.getReactively('page') - 1) * $scope.getReactively('perPage')),
      sort: $scope.getReactively('sort')
    }, $scope.getReactively('search')<% } %>)<% if(pagination){ %>.then(function() {
      $scope.thingsCount = $meteor.object(Counts, 'numberOfThings', false);
    })<% } %>;
  });
    
  $scope.save = function() {
    if($scope.form.$valid) {
      $scope.things.save($scope.newThing);
      $scope.newThing = undefined;
    }
  };
      
  $scope.remove = function(thing) {
    $scope.things.remove(thing);
  };<% if(pagination){ %>
    
  $scope.pageChanged = function(newPage) {
    $scope.page = newPage;
  };
    
  $scope.$watch('orderProperty', function() {
    if($scope.orderProperty) {
      $scope.sort = {name_sort: parseInt($scope.orderProperty)};
    }
  });<% } %>
});