'use strict'

angular.module '<%= appname %>'

.config ['$urlRouterProvider', '$locationProvider', ($urlRouterProvider, $locationProvider) ->
  $locationProvider.html5Mode true
  $urlRouterProvider.otherwise '/'
]