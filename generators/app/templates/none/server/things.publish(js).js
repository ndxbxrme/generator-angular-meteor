'use strict'
<% if(pagination){ %>
Meteor.publish('things', function(options, searchString) {
  var where = {
    'name': {
      '$regex': '.*' + (searchString || '') + '.*',
      '$options': 'i'
    }
  };
  Counts.publish(this, 'numberOfThings', Things.find(where), {noReady: true});
  return Things.find(where, options);
});
<% } %>