'use strict'

angular.module '<%= appname %>'
.config ($stateProvider) ->
  $stateProvider
  .state 'main',
    url: '/'
    templateUrl: 'client/main/main.view<%if(!jade) {%>.ng<%}%>.html'
    controller: 'MainCtrl'