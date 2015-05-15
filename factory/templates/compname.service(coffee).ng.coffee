'use strict'

angular.module '<%= appname %>'
.factory '<%= compname %>', () ->
  
  # Private API
  meaningOfLife = 42
  
  # Public API
  someMethod: () ->
    meaningOfLife