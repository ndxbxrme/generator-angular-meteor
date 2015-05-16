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
<% if(pagination) { %>
<%= compnameCapped %>.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: 'name'
  },
  name_sort: {
    type: String,
    optional: true,
    autoValue: function() {
      var name = this.field('name');
      if(name.isSet) {
        return name.value.toLowerCase();
      }
      else {
        return this.unset();
      }
    }
  }
}));<% } %>