'use strict'

angular.module '<%= appname %>'
.directive 'toolbar', [() ->
  {
    restrict: 'AE'
    templateUrl: 'client/components/toolbar/toolbar.view<%if(!jade) {%>.ng<%}%>.html'
    replace: true
  }
]