'use strict'

angular.module '<%= appname %>'
.controller '<%= compnameCappedSingular%>DetailCtrl', ['$scope', '$stateParams', '$meteor', ($scope, $stateParams, $meteor) ->
  $scope.<%= compnameSingular %> = $meteor.object <%= compnameCapped %>, $stateParams.<%= compnameSingular %>Id
  $scope.subscribe('<%=compname%>')
  
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