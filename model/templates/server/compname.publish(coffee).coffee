'use strict'

Meteor.publish '<%= compname %>', (options, searchString) ->
  if searchString == null
    searchString = ''
  Counts.publish this, 'numberOf<%= compnameCapped %>', <%= compnameCapped %>.find(
    'name':
      '$regex': '.*' + searchString or '' + '.*'
      '$options': 'i'
  ), noReady: true
  <%= compnameCapped %>.find {
    'name':
      '$regex': '.*' + searchString or '' + '.*'
      '$options': 'i'
  }, options