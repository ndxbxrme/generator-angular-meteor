Meteor.startup(function() {
  if(Things.find().count() === 0) {
    var things = [
      {
        name: 'Data on the Wire'
      },
      {
        name: 'One Language'
      },
      {
        name: 'Database Everywhere'
      },
      {
        name: 'Latency Compensation'
      },
      {
        name: 'Full Stack Reactivity'
      },
      {
        name: 'Embrace the Ecosystem'
      },
      {
        name: 'Simplicity Equals Productivity'
      }
    ];
    things.forEach(function(thing) {
      Things.insert(thing);
    });
  }
});