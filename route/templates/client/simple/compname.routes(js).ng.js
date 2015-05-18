'use strict'

angular.module('<%= appname %>')
.config(function($stateProvider) {
  $stateProvider
  .state('<%= compname %>', {
    url: '/<%= compnameSlugged %>',
    templateUrl: '<%= dir %>/<%=compnameSlugged%>.view.html',
    controller: '<%= compnameCapped %>Ctrl'<% if(auth && protected) { %>,
    resolve: {
      currentUser: ['$meteor', function($meteor) {
        return $meteor.requireUser();
      }]
    }<% } %>
  });
});