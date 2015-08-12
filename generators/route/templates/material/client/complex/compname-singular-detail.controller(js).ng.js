'use strict'

angular.module('<%= appname %>')
.controller('<%= compnameCappedSingular%>DetailCtrl', function($scope, $stateParams, $meteor) {
  $scope.<%= compnameSingular %> = $scope.$meteorObject(<%= compnameCapped %>, $stateParams.<%= compnameSingular %>Id);
  $scope.$meteorSubscribe('<%=compname%>');
  
  $scope.save = function() {
    if($scope.form.$valid) {
      $scope.<%= compnameSingular %>.save().then(
        function(numberOfDocs) {
          console.log('save successful, docs affected ', numberOfDocs);
        },
        function(error) {
          console.log('save error ', error);
        }
      )
    }
  };
        
  $scope.reset = function() {
    $scope.<%= compnameSingular %>.reset();
  };
});