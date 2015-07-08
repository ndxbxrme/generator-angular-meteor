@Things = new Mongo.Collection('things')

Things.allow
  insert: (userId, thing) ->
    thing.createdAt = new Date()
    thing.name_sort = thing.name.toLowerCase()
    true
  update: (userId, thing, fields, modifier) ->
    thing.updatedAt = new Date()
    thing.name_sort = thing.name.toLowerCase()
    true
  remove: (userId, thing) ->
    true