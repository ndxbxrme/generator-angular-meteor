Meteor.startup ->
  if Things.find().count() == 0
    things = [
      'Data on the Wire'
      'One Language'
      'Database Everywhere'
      'Latency Compensation'
      'Full Stack Reactivity'
      'Embrace the Ecosystem'
      'Simplicity Equals Productivity'
    ]
    things.forEach (thing) ->
      Things.insert 
        name: thing
        name_sort: thing.toLowerCase()
        createdAt: new Date()