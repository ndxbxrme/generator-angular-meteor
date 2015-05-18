@<%= compnameCapped %> = new Mongo.Collection('<%= compname %>')

<%= compnameCapped %>.allow
  insert: (userId, <%= compnameSingular %>) ->
    <% if(auth && protected) { %>userId<% } else { %>true<% } %>
  update: (userId, <%= compnameSingular %>, fields, modifier) ->
    <% if(auth && protected) { %>userId<% } else { %>true<% } %>
  remove: (userId, <%= compnameSingular %>) ->
    <% if(auth && protected) { %>userId<% } else { %>true<% } %>
