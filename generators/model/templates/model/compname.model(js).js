<%= compnameCapped %> = new Mongo.Collection('<%= compname %>');

<%= compnameCapped %>.allow({
  insert: function(userId, <%= compnameSingular %>) {
    <% if(auth && protected) { %>return userId<% } else { %>return true<% } %>;
  },
  update: function(userId, <%= compnameSingular %>, fields, modifier) {
    <% if(auth && protected) { %>return userId<% } else { %>return true<% } %>;
  },
  remove: function(userId, <%= compnameSingular %>) {
    <% if(auth && protected) { %>return userId<% } else { %>return true<% } %>;
  }
});