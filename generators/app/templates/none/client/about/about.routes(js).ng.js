'use strict'

angular.module('<%= appname %>')
.config(function($stateProvider) {
  $stateProvider
  .state('about', {
    url: '/about',
    templateUrl: 'client/about/about.view<%if(!jade) {%>.ng<%}%>.html',
    controller: 'AboutCtrl'
  });
});