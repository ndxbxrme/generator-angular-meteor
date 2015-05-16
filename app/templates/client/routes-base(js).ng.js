'use strict';

angular.module('<%= appname %>')

.config(function($urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
})
  
.run(function($rootScope, $location) {
  $rootScope.$on('$stateChangeStart', function(event, next) {
    if(next.authenticate && !$rootScope.currentUser) {
      $location.path('/');
    }
  });
});