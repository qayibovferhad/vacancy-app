import "./navigation.html";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
Template.navigation.helpers({
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
Template.navigation.events({
  "click #logoutBtn": function (event, template) {
    Meteor.logout();
    FlowRouter.go("/");
  },
});