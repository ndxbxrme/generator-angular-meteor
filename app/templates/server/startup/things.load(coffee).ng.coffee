Meteor.startup ->
  if Things.find().count() == 0
    things = [
      {
        'name': 'Thing 1'
      }
      {
        'name': 'Thing 2'
      }
      {
        'name': 'Thing 3'
      }
      {
        'name': 'Thing 4'
      }
      {
        'name': 'Thing 5'
      }
    ]
    things.forEach (thing) ->
      Things.insert thing