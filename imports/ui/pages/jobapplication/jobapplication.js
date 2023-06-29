import { Jobs } from "../../../api/jobs/collection";
import "./jobapplication.html";
Template.jobapplication.onCreated(function () {
  this.autorun(() => {
    this.subscribe("get.jobs");
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
    console.log(this);
    Meteor.call("remove.job", this._id);
  },
});
