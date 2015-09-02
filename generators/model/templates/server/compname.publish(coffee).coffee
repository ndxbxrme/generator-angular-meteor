'use strict'
<% if(pagination){ %>
Meteor.publish '<%= compname %>', (options, searchString) ->
  where =
    'name':
      '$regex': '.*' + (searchString or '') + '.*'
      '$options': 'i'
  Counts.publish this, 'numberOf<%= compnameCapped %>', <%= compnameCapped %>.find(where), noReady: true
  <%= compnameCapped %>.find where, options<% } %>