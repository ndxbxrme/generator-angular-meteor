'use strict'

angular.module '<%= appname %>'
.directive 'toolbar', () ->
  {
    restrict: 'AE'
    templateUrl: 'client/components/toolbar/toolbar.view.html'
    replace: true
  }