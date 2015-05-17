'use strict'

angular.module '<%= appname %>'
.config ($stateProvider) ->
  $stateProvider
  .state '<%= compname %>-list',
    url: '/<%= compnameSlugged %>'
    templateUrl: '<%= dir %>/<%=compnameSlugged%>-list.view<%if(!jade) {%>.ng<%}%>.html'
    controller: '<%= compnameCapped %>ListCtrl'<% if(auth && protected) { %>
    authenticate: true<% } %>
  .state '<%= compnameSingular %>-detail',
    url: '/<%= compnameSlugged %>/:<%=compnameSingular%>Id'
    templateUrl: '<%= dir %>/<%=compnameSluggedSingular%>-detail.view<%if(!jade) {%>.ng<%}%>.html'
    controller: '<%= compnameCappedSingular %>DetailCtrl'<% if(auth && protected) { %>
    authenticate: true<% } %>