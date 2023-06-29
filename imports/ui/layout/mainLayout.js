import "./mainLayout.html";
Template.mainLayout.helpers({
  currentUserCeo() {
    const currentUser = Meteor.user();
    if (currentUser && currentUser.profile && currentUser.profile.typeValue) {
      const type = currentUser.profile.typeValue;
      if (type === "ceo") {
        return true;
      }
    }
    return false;
  },
});
