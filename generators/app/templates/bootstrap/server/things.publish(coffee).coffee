'use strict'
<% if(pagination){ %>
Meteor.publish 'things', (options, searchString) ->
  where =
    'name':
      '$regex': '.*' + (searchString or '') + '.*'
      '$options': 'i'
  Counts.publish this, 'numberOfThings', Things.find(where), noReady: true
  Things.find where, options<% } %>