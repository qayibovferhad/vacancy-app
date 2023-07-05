import "./mainLayout.html";
Template.mainLayout.helpers({
  isCeo() {
    const currentUser = Meteor.user();
    return (
      currentUser &&
      currentUser.profile &&
      currentUser.profile.typeValue === "ceo"
    );
  },
});
