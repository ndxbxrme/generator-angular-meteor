'use strict'

angular.module '<%= appname %>'
.directive 'nav', ($state) ->
  restrict: 'AE'
  templateUrl: 'client/components/nav/nav.view<%if(!jade) {%>.ng<%}%>.html'
  replace: true
  link: (scope, elem, attr) ->
    scope.getState = ->
      $state.current.name
