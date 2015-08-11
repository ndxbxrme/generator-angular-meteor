'use strict'

angular.module('<%= appname %>')
.controller('<%= compnameCapped%>ListCtrl', function($scope, $meteor) {
<% if(pagination){ %>  $scope.page = 1
  $scope.perPage = 3
  $scope.sort = {name_sort : 1};
  $scope.orderProperty = '1'
  
<% } %>  $scope.<%= compname %> = $scope.$meteorCollection<% if(pagination){ %>(function() {
    return <%= compnameCapped %>.find({}, {sort:$scope.getReactively('sort')});
  });<% } else { %>(<%= compnameCapped %>);<% } %>
  $meteor.autorun($scope, function() {
    $meteor.subscribe('<%= compname %>'<% if(pagination){ %>, {
      limit: parseInt($scope.getReactively('perPage')),
      skip: parseInt(($scope.getReactively('page') - 1) * $scope.getReactively('perPage')),
      sort: $scope.getReactively('sort')
    }, $scope.getReactively('search')<% } %>)<% if(pagination){ %>.then(function() {
      $scope.<%= compname %>Count = $scope.$meteorObject(Counts, 'numberOf<%= compnameCapped %>', false);
    })<% } %>;
  });
    
  $scope.save = function() {
    if($scope.form.$valid) {
      $scope.<%= compname %>.save($scope.new<%= compnameCappedSingular %>);
      $scope.new<%= compnameCappedSingular %> = undefined;
    }
  };
      
  $scope.remove = function(<%= compnameSingular %>) {
    $scope.<%= compname %>.remove(<%= compnameSingular %>);
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
        