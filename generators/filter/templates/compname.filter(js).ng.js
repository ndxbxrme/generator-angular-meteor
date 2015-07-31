'use strict';

angular.module('<%= appname %>')
.filter('<%= compname %>', function() {
  return function(input) {
    return '<%= compname %> filter: ' + input;
  };
});