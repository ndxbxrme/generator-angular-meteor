'use strict'
<% if(pagination){ %>
Meteor.publish('<%= compname %>', function(options, searchString) {
  if(!searchString) {
    searchString = '';
  }
  Counts.publish(this, 'numberOf<%= compnameCapped %>', <%= compnameCapped %>.find({
    'name': {
      '$regex': '.*' + searchString || '' + '.*',
      '$options': 'i'
    }
  }), {noReady: true});
  return <%= compnameCapped %>.find({
    'name': {
      '$regex': '.*' + searchString || '' + '.*',
      '$options': 'i'
    }
  }, options);
});
<% } %>