'use strict'

angular.module '<%= appname %>'

.config ($urlRouterProvider, $locationProvider) ->
  $locationProvider.html5Mode true
  $urlRouterProvider.otherwise '/'

<% if(auth) { %>.run ($rootScope, $state) ->
  $rootScope.$on '$stateChangeError', (event, toState, toParams, fromState, fromParams, error) ->
    if error is 'AUTH_REQUIRED'
      $state.go '/'
<% } %>