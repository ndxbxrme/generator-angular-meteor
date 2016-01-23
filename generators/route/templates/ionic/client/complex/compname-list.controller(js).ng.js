'use strict'

angular.module('<%= appname %>')
.controller('<%= compnameCapped%>ListCtrl', function($scope, $ionicScrollDelegate) {
<% if(pagination){ %>  $scope.page = 1;
  $scope.perPage = 3;
  $scope.sort = {name_sort : 1};
  $scope.orderProperty = '1';
  
  $scope.helpers({
    <%= compname %>: function() {
      return <%= compnameCapped %>.find({}, {
        sort: $scope.getReactively('sort') 
      });
    },
    <%= compname %>Count: function() {
      return Counts.get('numberOf<%= compnameCapped %>');
    }
  });
                  
  $scope.subscribe('<%= compname %>', function() {
    return [{
      sort: $scope.getReactively('sort'),
      limit: parseInt($scope.getReactively('perPage')),
      skip: ((parseInt($scope.getReactively('page'))) - 1) * (parseInt($scope.getReactively('perPage')))
    }, $scope.getReactively('search')];
  });

  $scope.save = function() {
    if ($scope.form.$valid) {
      <%= compnameCapped %>.insert($scope.new<%= compnameCappedSingular %>);
      $scope.new<%= compnameCappedSingular %> = undefined;
      $ionicScrollDelegate.resize();
    }
  };
                  
  $scope.remove = function(<%= compnameSingular %>) {
    <%= compnameCapped %>.remove({_id:<%= compnameSingular %>.id});
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
    <%= compname %>: function() {
      return <%= compnameCapped %>.find({});
    }
  });
                  
  $scope.subscribe('<%= compname %>', function() {
    return [{}, $scope.getReactively('search')];
  });

  $scope.save = function() {
    if ($scope.form.$valid) {
      <%= compnameCapped %>.insert($scope.new<%= compnameCappedSingular %>);
      $scope.new<%= compnameCappedSingular %> = undefined;
      $ionicScrollDelegate.resize();
    }
  };
                  
  $scope.remove = function(<%= compnameSingular %>) {
    <%= compnameCapped %>.remove({_id:<%= compnameSingular %>.id});
    $ionicScrollDelegate.resize();
  };<% } %>
});