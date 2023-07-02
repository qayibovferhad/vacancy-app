import { Jobs } from "../../../api/jobs/collection";
import { Random } from "meteor/random";
import "./home.html";
Template.home.onCreated(function () {
  this.ceoName = new ReactiveVar();
  this.autorun(() => {
    let query = {
      ownCeoId: Meteor.userId(),
    };
    this.subscribe("get.cv", query);
  });
  this.autorun(() => {
    const currentUser = Meteor.user();
    if (currentUser) {
      this.subscribe("get.jobs");
    }
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
      imgId: Meteor.user().profile.imgId,
      userId: Meteor.userId(),
      cvId: Random.id(),
      jobId: this.jobId,
      ownCeoId: this.ownCeoId,
      status: "pending",
    };
    let query = {
      jobId: data.jobId,
      userSkills: Meteor.user().profile.skills,
      wishSkills: this.skills,
      userExperience: Meteor.user().profile.experience,
      wishExperience: this.experience,
    };
    Meteor.call("checkCvItem", query, function (err) {
      if (err) {
        alert(err.error);
      } else {
        Meteor.call("add.cv", data);
      }
    });
  },
});
