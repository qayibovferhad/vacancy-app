import "./createjob.html";
import { jobValidationText } from "../../../api/jobs/collection";
import { Random } from "meteor/random";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.createjob.onCreated(function () {
  let query = {
    ownCeoId: Meteor.userId(),
  };
  this.subscribe("get.jobs", query);
});

Template.createjob.events({
  "submit #createJobForm": function (event, template) {
    event.preventDefault();

    let title = $("#title").val();
    let typeofemployment = $("#typeofemployment").val();
    let salary = $("#salary").val();
    let description = $("#description").val();
    let skills = $("#skills").val();
    let skillsArray = skills.split(",");
    let experience = $("#experience").val();
    console.log(Meteor.user());

    let jobData = {
      _id: Random.id(),
      ceoName: Meteor.user().username,
      ownCeoId: Meteor.userId(),
      jobId: Random.id(),
      title: title,
      companyname: Meteor.user().profile.company,
      typeofemployment: typeofemployment,
      salary: salary,
      description: description,
      skills: skillsArray,
      experience,
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

    Meteor.call("add.job", jobData, function (err) {
      if (err) {
        console.log(err);
      } else {
        FlowRouter.go("/jobapplication");
      }
    });
  },
});
