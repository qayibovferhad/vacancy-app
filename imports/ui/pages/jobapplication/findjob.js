import { Cv, Cv_Files } from "../../../api/cv/collection";
import { Random } from "meteor/random";
import "./findjob.html";
Template.findjob.onCreated(function () {
  this.loading = new ReactiveVar(false);
  this.autorun(() => {
    this.subscribe("get.cv");
  });
});
Template.findjob.helpers({
  getLoading: function () {
    return Template.instance().loading.get();
  },
  getMyApplies: function () {
    let userId = Meteor.userId();
    return Cv.find({ userId });
  },
});
Template.findjob.events({
  "click #removeCv": function () {
    Meteor.call("remove.cv", this._id);
  },
  "click #editCv": function (event, template) {
    $("#editCvForm").toggleClass("d-none");
  },
  "submit #editCvForm": function (event, template) {
    event.preventDefault();
    let userId = Meteor.user()._id;
    let position = $("#position").val();
    let skills = $("#skills").val();
    let age = parseInt($("#age").val());
    let experience = parseInt($("#experience").val());
    let education = $("#education").val();
    let skillsArr = skills.split(",");
    let file = document.getElementById("fileUpload").files[0];
    let data = {
      position,
      skillsArr,
      age,
      experience,
      education,
    };

    const upload = Cv_Files.insert(
      {
        fileId: Random.id(),
        meta: {
          temp: true,
          cvId: userId,
        },
        file,
        chunkSize: "dynamic",
      },
      false
    );

    upload.on("start", function () {
      template.loading.set(true);
    });
    upload.on("end", function (error, fileObj) {
      if (error) {
        alert("error: " + error);
        console.log("error", error);
      } else {
        alert(`file: ${fileObj.name} successfully uploaded`);
        data.imgId = fileObj._id;
        Meteor.call("update.userCv", userId, data);
      }
      template.loading.set(false);
    });

    upload.start();

    document.getElementById("editCvForm").className = "d-none";
  },
});
