'use strict'

angular.module('<%= appname %>')
.config(function($stateProvider) {
  $stateProvider
  .state('main', {
    url: '/',
    templateUrl: 'client/main/main.view<%if(!jade) {%>.ng<%}%>.html',
    controller: 'MainCtrl'
  });
});