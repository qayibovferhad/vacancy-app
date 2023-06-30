import { Jobs } from "../../../api/jobs/collection";
import "./jobapplication.html";

Template.jobapplication.onCreated(function () {
  this.autorun(() => {
    let query = {
      ownCeoId: Meteor.userId(),
    };
    this.subscribe("get.jobs", query);
  });
  this.autorun(() => {
    this.subscribe("get.cv");
  });
});

Template.jobapplication.helpers({
  myJobs: function () {
    return Jobs.find({
      ownCeoId: Meteor.userId(),
    });
  },
});

Template.jobapplication.events({
  "click #removeJob": function () {
    Meteor.call("remove.job", this._id);
  },
});
