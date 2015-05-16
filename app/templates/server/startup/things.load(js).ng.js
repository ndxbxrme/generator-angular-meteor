Meteor.startup(function() {
  if(Things.find().count() === 0) {
    var things = [
      {
        'name': 'Thing 1'
      },
      {
        'name': 'Thing 2'
      },
      {
        'name': 'Thing 3'
      },
      {
        'name': 'Thing 4'
      },
      {
        'name': 'Thing 5'
      }
    ];
    things.forEach(function(thing) {
      Things.insert(thing);
    });
  }
});