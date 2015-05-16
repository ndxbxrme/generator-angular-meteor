'use strict';

angular.module('<%= appname %>')
.factory('<%= compname %>', function() {
  
  // Private API
  var meaningOfLife = 42
  
  // Public API
  return {
    someMethod: function() {
      return meaningOfLife;
    }
  };
});