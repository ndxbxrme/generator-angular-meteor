'use strict'
<% if(pagination){ %>
Meteor.publish 'things', (options, searchString) ->
  if !searchString
    searchString = ''
  Counts.publish this, 'numberOfThings', Things.find(
    'name':
      '$regex': '.*' + searchString or '' + '.*'
      '$options': 'i'
  ), noReady: true
  Things.find {
    'name':
      '$regex': '.*' + searchString or '' + '.*'
      '$options': 'i'
  }, options<% } %>