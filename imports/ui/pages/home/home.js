import { Jobs } from "../../../api/jobs/collection";
import { Random } from "meteor/random";
import "./home.html";
Template.home.onCreated(function () {
  this.ceoName = new ReactiveVar();
  this.autorun(() => {
    this.subscribe("get.cv");
  });
  this.autorun(() => {
    this.subscribe("get.jobs");
  });
  this.autorun(() => {
    const currentUser = Meteor.user();
    if (
      currentUser &&
      currentUser.profile &&
      currentUser.profile.typeValue === "ceo"
    ) {
      const ownCeoId = currentUser.ownCeoId;
      this.subscribe("get.users", ownCeoId);
    }
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
    return Jobs.find({});
  },
  formatDate(date) {
    return date.toLocaleString();
  },
});
Template.home.events({
  "click #applyBtn": function () {
    console.log(Meteor.user());
    let data = {
      _id: Random.id(),
      title: this.title,
      companyname: this.companyname,
      ceoName: this.ceoName,
      username: Meteor.user().username,
      age: Meteor.user().profile.age,
      status: "pending",
      userId: Meteor.userId(),
      cvId: Random.id(),
      jobId: this.jobId,
      ownCeoId: this.ownCeoId,
    };
    Meteor.call("add.cv", data);
  },
});
