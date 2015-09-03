'use strict'

angular.module '<%= appname %>'
.config ($stateProvider) ->
  $stateProvider
  .state '<%= compname %>',
    url: '/<%= compnameSlugged %>'
    templateUrl: '<%= dir %>/<%=compnameSlugged%>.view.html'
    controller: '<%= compnameCapped %>Ctrl'<% if(auth && protected) { %>
    resolve:
      currentUser: ['$meteor', ($meteor) ->
        $meteor.requireUser()
      ]<% } %>
