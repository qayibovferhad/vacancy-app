import "./findjob.html";
// Template.findjob.onCreated
Template.findjob.events({
  "click #editCv": function (event, template) {
    $("#editCvForm").toggleClass("d-none");
  },
  "submit #editCvForm": function (event, template) {
    event.preventDefault();
    let userId = Meteor.user()._id;
    let position = $("#position").val();
    let skills = $("#skills").val();
    let age = $("#age").val();
    let experience = $("#experience").val();
    let education = $("#education").val();
    let skillsArr = skills.split(",");
    console.log(skillsArr);
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
