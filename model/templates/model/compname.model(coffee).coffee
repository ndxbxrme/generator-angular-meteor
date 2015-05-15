@<%= compnameCapped %> = new Mongo.Collection('<%= compname %>')

<%= compnameCapped %>.allow
  insert: (userId, <%= compnameSingular %>) ->
    <% if(auth && protected) { %>userId<% } else { %>true<% } %>
  update: (userId, <%= compnameSingular %>, fields, modifier) ->
    <% if(auth && protected) { %>userId<% } else { %>true<% } %>
  remove: (userId, <%= compnameSingular %>) ->
    <% if(auth && protected) { %>userId<% } else { %>true<% } %>

<%= compnameCapped %>.attachSchema new SimpleSchema
  name:
    type: String
    label: 'name'
  name_sort:
    type: String
    optional: true
    autoValue: () ->
      name = this.field('name')
      if name.isSet
        name.value.toLowerCase()
      else
        @unset()