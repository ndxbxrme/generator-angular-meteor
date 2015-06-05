Things = new Mongo.Collection('things');

Things.allow({
  insert: function(userId, thing) {
    return true;
  },
  update: function(userId, thing, fields, modifier) {
    return true;
  },
  remove: function(userId, thing) {
    return true;
  }
});
<% if(pagination) { %>    
Things.attachSchema(new SimpleSchema({
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