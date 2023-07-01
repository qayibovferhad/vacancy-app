import "./navigation.html";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { Cv } from "../../../api/cv/collection";
Template.navigation.onCreated(function () {
  this.autorun(() => {
    this.subscribe("cv");
  });
});
Template.navigation.helpers({
  getIncomingCount: function () {
    let ceoId = Meteor.userId();
    return Cv.find({ ownCeoId: ceoId, status: "pending" }).count();
  },
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
