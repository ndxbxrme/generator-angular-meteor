'use strict';

angular.module('<%= appname %>')
  .config(function ($provide) {
    $provide.decorator('<%= compname %>', function ($delegate) {
      // decorate the $delegate
      return $delegate;
    });
  });