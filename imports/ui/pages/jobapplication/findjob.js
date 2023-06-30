import { Cv } from "../../../api/cv/collection";
import { Jobs } from "../../../api/jobs/collection";
import "./findjob.html";
Template.findjob.onCreated(function () {
  this.autorun(() => {
    this.subscribe("get.cv");
  });
});
Template.findjob.helpers({
  getMyApplies: function () {
    let userId = Meteor.userId();
    return Cv.find({ userId });
  },
});
Template.findjob.events({
  "click #uploadCv": function () {},
  "click #editCv": function (event, template) {
    $("#editCvForm").toggleClass("d-none");
  },
  "submit #editCvForm": function (event, template) {
    event.preventDefault();
    let userId = Meteor.user()._id;
    let position = $("#position").val();
    let skills = $("#skills").val();
    let age = $("#age").val();
    let experience = parseInt($("#experience").val());
    let education = $("#education").val();
    let skillsArr = skills.split(",");
    let data = {
      position,
      skillsArr,
      age,
      experience,
      education,
    };
    Meteor.call("update.userCv", userId, data);
    document.getElementById("editCvForm").className = "d-none";
  },
});
