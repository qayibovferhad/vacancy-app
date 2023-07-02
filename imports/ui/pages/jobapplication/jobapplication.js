import { Jobs } from "../../../api/jobs/collection";
import "./jobapplication.html";

Template.jobapplication.onCreated(function () {
  this.getClickedJob = new ReactiveVar();
  this.autorun(() => {
    let query = {
      ownCeoId: Meteor.userId(),
    };
    this.subscribe("get.jobs", query);
  });
  this.autorun(() => {
    let query = {
      status: "pending",
      ownCeoId: Meteor.userId(),
    };
    this.subscribe("get.cv", query);
  });
});

Template.jobapplication.helpers({
  myJobs: function () {
    return Jobs.find({
      ownCeoId: Meteor.userId(),
    });
  },
  getClickedJob: function () {
    return Template.instance().getClickedJob.get();
  },
});

Template.jobapplication.events({
  "click #removeJob": function () {
    Meteor.call("remove.job", this._id);
  },
  "click #editJob": function (event, template) {
    template.getClickedJob.set(this);
  },
  "submit #editForm": function (event, template) {
    event.preventDefault();
    let typeofemployment = $("#typeofemployment").val();
    let salary = $("#salary").val();
    let description = $("#description").val();
    let clickedJob = template.getClickedJob.get();
    let query = {
      typeofemployment,
      salary,
      description,
    };
    Meteor.call("update.job", clickedJob._id, query);
    template.getClickedJob.set("");
  },
});
