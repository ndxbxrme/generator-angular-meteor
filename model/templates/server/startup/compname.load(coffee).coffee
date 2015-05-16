Meteor.startup ->
  if <%= compnameCapped %>.find().count() == 0
    <%= compname %> = [
      {
        'name': '<%= compnameSingular %> 1'
      }
      {
        'name': '<%= compnameSingular %> 2'
      }
    ]
    <%= compname %>.forEach (<%= compnameSingular %>) ->
      <%= compnameCapped %>.insert <%= compnameSingular %>