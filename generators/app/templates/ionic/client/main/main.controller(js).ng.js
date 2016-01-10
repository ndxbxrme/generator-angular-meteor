'use strict'

angular.module('<%= appname %>')
.controller('MainCtrl', function($scope, $ionicScrollDelegate) {
<% if(pagination){ %>  $scope.page = 1
  $scope.perPage = 3
  $scope.sort = {name_sort : 1};
  $scope.orderProperty = '1'
  
  $scope.helpers({
    things: function() {
      return Things.find({}, {
        sort: $scope.getReactively('sort') 
      });
    },
    thingsCount: function() {
      return Counts.get('numberOfThings');
    }
  });
                  
  $scope.subscribe('things', function() {
    return [{
      sort: $scope.getReactively('sort'),
      limit: parseInt($scope.getReactively('perPage')),
      skip: ((parseInt($scope.getReactively('page'))) - 1) * (parseInt($scope.getReactively('perPage')))
    }, $scope.getReactively('search')];
  });

  $scope.save = function() {
    if ($scope.form.$valid) {
      $scope.things.save($scope.newThing);
      $scope.newThing = undefined;
      $ionicScrollDelegate.resize();
    }
  };
                  
  $scope.remove = function(thing) {
    $scope.things.remove(thing);
    $ionicScrollDelegate.resize();
  };
                  
  $scope.pageChanged = function(newPage) {
    $scope.page = newPage;
  };
                  
  return $scope.$watch('orderProperty', function() {
    if ($scope.orderProperty) {
      $scope.sort = {
        name_sort: parseInt($scope.orderProperty)
      };
    }
  });<% } else { %>
    
  $scope.helpers({
    things: function() {
      return Things.find({});
    }
  });
                  
  $scope.subscribe('things', function() {
    return [{}, $scope.getReactively('search')];
  });

  $scope.save = function() {
    if ($scope.form.$valid) {
      $scope.things.save($scope.newThing);
      $scope.newThing = undefined;
      $ionicScrollDelegate.resize();
    }
  };
                  
  $scope.remove = function(thing) {
    $scope.things.remove(thing);
    $ionicScrollDelegate.resize();
  };<% } %>
});