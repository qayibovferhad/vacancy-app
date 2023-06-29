Meteor.publish({
  "get.users": function () {
    return Meteor.users.find();
  },
});
