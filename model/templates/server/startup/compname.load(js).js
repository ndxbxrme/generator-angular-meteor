Meteor.startup(function() {
  if(<%= compnameCapped %>.find().count() === 0) {
    var <%= compname %> = [
      {
        'name': '<%= compnameSingular %> 1'
      },
      {
        'name': '<%= compnameSingular %> 2'
      }
    ];
    <%= compname %>.forEach(function(<%= compnameSingular %>) {
      <%= compnameCapped %>.insert(<%= compnameSingular %>);
    });
  }
});