'use strict'

angular.module '<%= appname %>'
.controller '<%= compnameCappedSingular%>DetailCtrl', ($scope, $stateParams, $state) ->

  $scope.helpers
    <%= compnameSingular %>: () ->
      <%= compnameCapped %>.findOne
        _id: $stateParams.<%= compnameSingular %>Id
        
  $scope.subscribe '<%= compname %>'
  
  $scope.save = () ->
    if $scope.form.$valid
      delete $scope.<%= compnameSingular %>._id
      <%= compnameCapped %>.update
        _id: $stateParams.<%= compnameSingular %>Id
      ,
        $set: $scope.<%= compnameSingular %>
      , (error) ->
        if error
          console.log 'Unable to update the <%= compnameSingular %>'
        else
          console.log 'Done!'
          $state.go '<%= compname %>-list'
        
  $scope.reset = () ->
    $scope.<%= compnameSingular %>.reset()
