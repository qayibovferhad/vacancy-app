import "./jobdetail.html";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { Jobs } from "../../../api/jobs/collection";

Template.jobdetail.onCreated(function () {
  this.jobId = new ReactiveVar();

  this.autorun(() => {
    FlowRouter.watchPathChange();
    this.jobId.set(FlowRouter.getParam("_id"));
  });

  this.autorun(() => {
    if (this.jobId.get()) {
      let query = {
        _id: this.jobId.get(),
      };
      this.subscribe("get.jobs", query);
    }
  });
});

Template.jobdetail.helpers({
  getCurrentJob: function () {
    return Jobs.findOne({ _id: Template.instance().jobId.get() });
  },

  getSkills: function () {
    const skills = Jobs.findOne({
      _id: Template.instance().jobId.get(),
    }).skills;
    return skills.join(",");
  },

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
});
