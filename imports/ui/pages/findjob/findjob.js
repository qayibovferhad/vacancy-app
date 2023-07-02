import { Cv, Cv_Files } from "../../../api/cv/collection";
import { Random } from "meteor/random";
import "./findjob.html";
import { Jobs } from "../../../api/jobs/collection";

Template.findjob.onCreated(function () {
  this.loading = new ReactiveVar(false);

  this.autorun(() => {
    let query = {
      userId: Meteor.userId(),
    };
    this.subscribe("get.cv", query);
  });
});

Template.findjob.helpers({
  getUserInfo: function () {
    console.log(Meteor.user());
    return Meteor.user();
  },

  getLoading: function () {
    return Template.instance().loading.get();
  },

  getMyApplies: function () {
    let userId = Meteor.userId();
    let cv = Cv.find({ userId: userId }).fetch();
    console.log(cv);
    return cv.map(function (cv) {
      let status = cv.status;

      if (status === "accepted") {
        cv.isAccepted = true;
      } else if (status === "rejected") {
        cv.isRejected = true;
      }

      const job = Jobs.findOne({ jobId: cv.jobId });
      cv.job = job;

      return cv;
    });
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
        console.log(userId);
        const user = Meteor.users.findOne({ _id: Meteor.userId() });
        console.log("usercv:", user);
        if (user && user.profile.imgId) {
          console.log("userImgId:", user.profile.imgId);
          Meteor.call("removeCvFile", user.profile.imgId, function (error) {
            if (error) {
              console.log("Hata:", error);
            } else {
              console.log("dg");
            }
          });
        }
        data.imgId = fileObj._id;
        Meteor.call("update.userCv", userId, data);
      }
      template.loading.set(false);
    });

    upload.start();

    document.getElementById("editCvForm").className = "d-none";
  },
  "click #okBtn": function () {
    Meteor.call("remove.cv", this._id);
  },
});
