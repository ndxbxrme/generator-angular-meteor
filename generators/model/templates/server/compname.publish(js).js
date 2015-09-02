'use strict'
<% if(pagination){ %>
Meteor.publish('<%= compname %>', function(options, searchString) {
  var where = {
    'name': {
      '$regex': '.*' + (searchString || '') + '.*',
      '$options': 'i'
    }
  };
  Counts.publish(this, 'numberOf<%= compnameCapped %>', <%= compnameCapped %>.find(where), {noReady: true});
  return <%= compnameCapped %>.find(where, options);
});
<% } %>