'use strict'

angular.module '<%= appname %>'
.config ($mdThemingProvider) ->
  $mdThemingProvider.theme('default')
  .primaryPalette('deep-orange')
  .accentPalette('lime')
