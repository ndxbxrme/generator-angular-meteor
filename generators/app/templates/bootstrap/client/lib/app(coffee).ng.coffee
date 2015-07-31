angular.module '<%= appname %>', [
  <%= modules %>
]

onReady = () ->
  angular.bootstrap document, ['<%= appname %>']
  
if Meteor.isCordova
  angular.element(document).on 'deviceready', onReady
else
  angular.element(document).ready onReady