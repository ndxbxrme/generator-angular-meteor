@Things = new Mongo.Collection('things')

Things.allow
  insert: (userId, thing) ->
    true
  update: (userId, thing, fields, modifier) ->
    true
  remove: (userId, thing) ->
    true
    
Things.attachSchema new SimpleSchema
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