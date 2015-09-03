'use strict'

angular.module '<%= appname %>'
.filter '<%= compname %>', ->
  (input) ->
    '<%= compname %> filter: ' + input
