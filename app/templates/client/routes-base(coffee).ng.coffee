'use strict'

angular.module '<%= appname %>'

.config ['$urlRouterProvider', '$locationProvider', ($urlRouterProvider, $locationProvider) ->
  $locationProvider.html5Mode true
  $urlRouterProvider.otherwise '/'
]
.run ['$rootScope', '$location', ($rootScope, $location) ->
  $rootScope.$on '$stateChangeStart', (event, next) ->
    if next.authenticate && !$rootScope.currentUser
      $location.path '/'
]