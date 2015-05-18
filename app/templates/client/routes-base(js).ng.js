'use strict';

angular.module('<%= appname %>')

.config(function($urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
});