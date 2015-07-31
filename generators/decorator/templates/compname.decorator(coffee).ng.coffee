'use strict'

angular.module '<%= appname %>'
.config ['$provide', ($provide) ->
  $provide.decorator '<%= compname %>', ($delegate) ->
    # decorate the delegate
    $delegate
]