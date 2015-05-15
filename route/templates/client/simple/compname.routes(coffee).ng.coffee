'use strict'

angular.module '<%= appname %>'
.config ($stateProvider) ->
  $stateProvider
  .state '<%= compname %>',
    url: '/<%= compnameSlugged %>'
    templateUrl: '<%= dir %>/<%= compnameSlugged%>/<%=compnameSlugged%>.view.html'
    controller: '<%= compnameCapped %>Ctrl'<% if(auth && protected) { %>
    authenticate: true<% } %>