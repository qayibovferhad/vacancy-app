import "./navigation.html";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.navigation.onCreated(function () {
  this.autorun(() => {
    this.subscribe("cv");
  });
});

Template.navigation.helpers({
  getUserInfo() {
    const currentUser = Meteor.user();
    if (currentUser) {
      return [currentUser];
    }
    return [];
  },

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
