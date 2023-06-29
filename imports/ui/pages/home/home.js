import { Jobs } from "../../../api/jobs/collection";
import "./home.html";
Template.home.onCreated(function () {
  this.ceoName = new ReactiveVar();
  this.autorun(() => {
    this.subscribe("get.jobs");
  });
  this.autorun(() => {
    this.subscribe("get.users");
  });
});
Template.home.helpers({
  currentUserType() {
    const currentUser = Meteor.user();
    if (currentUser && currentUser.profile && currentUser.profile.typeValue) {
      const type = currentUser.profile.typeValue;
      if (type === "ceo") {
        return false;
      }
    }
    return true;
  },
  allJobs: function () {
    console.log("Jobs.find({})", Jobs.find({}).fetch());
    return Jobs.find({});
  },
  formatDate(date) {
    return date.toLocaleString();
  },
  getCeoName(ownCeoId) {
    console.log("ownCeoId", ownCeoId);
    const ceo = Meteor.users.findOne({ _id: ownCeoId });
    return ceo && ceo.username;
  },
});
