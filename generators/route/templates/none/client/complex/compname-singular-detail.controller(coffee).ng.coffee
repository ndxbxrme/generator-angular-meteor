'use strict'

angular.module '<%= appname %>'
.controller '<%= compnameCappedSingular%>DetailCtrl', ['$scope', '$stateParams', '$meteor', ($scope, $stateParams, $meteor) ->
  $scope.<%= compnameSingular %> = $scope.$meteorObject <%= compnameCapped %>, $stateParams.<%= compnameSingular %>Id
  $meteor.subscribe('<%=compname%>')
  
  $scope.save = () ->
    if $scope.form.$valid
      $scope.<%= compnameSingular %>.save().then(
        (numberOfDocs) ->
          console.log 'save successful, docs affected ', numberOfDocs
        (error) ->
          console.log 'save error ', error
      )
        
  $scope.reset = () ->
    $scope.<%= compnameSingular %>.reset()
]