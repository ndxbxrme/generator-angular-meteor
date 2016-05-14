'use strict'

angular.module('<%= appname %>')
.controller('<%= compnameCappedSingular%>DetailCtrl', function($scope, $stateParams, $state) {
  
  $scope.helpers({
    <%= compnameSingular %>: function() {
      return <%= compnameCapped %>.findOne({ _id: $stateParams.<%= compnameSingular %>Id }); 
    }
  });
  
  $scope.subscribe('<%= compname %>');
  
  $scope.save = function() {
    if($scope.form.$valid) {
      delete $scope.<%= compnameSingular %>._id;
      <%= compnameCapped %>.update({
        _id: $stateParams.<%= compnameSingular %>Id
      }, {
        $set: $scope.<%= compnameSingular %>
      }, function(error) {
        if(error) {
          console.log('Unable to update the <%= compnameSingular %>'); 
        } else {
          console.log('Done!');
          $state.go('<%= compname %>-list');
        }
      });
    }
  };
        
  $scope.reset = function() {
    $scope.<%= compnameSingular %>.reset();
  };
});