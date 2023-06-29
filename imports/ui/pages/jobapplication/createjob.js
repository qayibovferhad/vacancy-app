import "./createjob.html";
import { jobValidationText } from "../../../api/jobs/collection";
import { Random } from "meteor/random";
Template.createjob.onCreated(function () {
  this.subscribe("get.jobs");
});

Template.createjob.events({
  "submit #createJobForm": function (event, template) {
    event.preventDefault();
    let title = $("#title").val();
    let companyname = $("#companyname").val();
    let typeofemployment = $("#typeofemployment").val();
    let salary = $("#salary").val();
    let description = $("#description").val();

    let jobData = {
      _id: Random.id(),
      ownCeoId: Meteor.userId(),
      jobId: Random.id(),
      title: title,
      companyname: Meteor.user().profile.company,
      typeofemployment: typeofemployment,
      salary: salary,
      description: description,
    };

    jobValidationText.reset();
    jobData = jobValidationText.clean(jobData);
    jobValidationText.validate(jobData);

    if (!jobValidationText.isValid()) {
      jobValidationText.validationErrors().map((err) => {
        console.log("err", err);
      });
      return;
    }
    Meteor.call("add.job", jobData);
  },
});
