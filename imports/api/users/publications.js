Meteor.publish("get.users", function () {
  const currentUserProfile = Meteor.users.findOne({ _id: this.userId }).profile;
  if (currentUserProfile && currentUserProfile.typeValue === "ceo") {
    return Meteor.users.find({});
  } else {
    return [];
  }
});
