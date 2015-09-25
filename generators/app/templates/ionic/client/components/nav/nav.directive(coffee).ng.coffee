'use strict'

angular.module '<%= appname %>'
.directive 'nav', ->
  restrict: 'AE'
  templateUrl: 'client/components/nav/nav.view<%if(!jade) {%>.ng<%}%>.html'
  replace: true
