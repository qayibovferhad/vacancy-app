import { Cv, Cv_Files } from "../../../api/cv/collection";
import "./incoming.html";

Template.incoming.onCreated(function () {
  this.autorun(() => {
    this.subscribe("get.cv");
  });
  this.autorun(() => {
    this.subscribe("get.users");
  });
});

Template.incoming.helpers({
  isAccepted: function () {
    return this.status === "accepted";
  },
  isRejected: function () {
    return this.status === "rejected";
  },
  getMyIncoming: function () {
    let ceoId = Meteor.userId();
    return Cv.find({ ownCeoId: ceoId }).fetch();
  },
  getImg: function (imgId) {
    console.log(imgId);
    let cvImage = Cv_Files.findOne({ _id: imgId });
    if (cvImage) {
      return cvImage.name;
    }
  },
});

Template.incoming.events({
  "click #downloadCv": function (event, template) {
    const cvId = event.target.dataset.cv;
    const cv = Cv.findOne(cvId);
    const cvFile = Cv_Files.findOne(cv.imgId);
    if (cvFile) {
      const fileUrl = cvFile.link();
      const fileName = cvFile.name;
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = fileName;
      link.click();
    }
  },
  "click .acceptBtn": function (event, template) {
    const cvId = event.target.dataset.cv;
    const acceptForm = template.find(`#acceptForm-${cvId}`);
    const rejectBtn = template.find(`#rejectCv-${cvId}`);

    if (acceptForm.classList.contains("d-none")) {
      acceptForm.classList.remove("d-none");
      rejectBtn.disabled = true;
    } else {
      acceptForm.classList.add("d-none");
      rejectBtn.disabled = false;
    }
  },
  "click .rejectBtn": function () {
    console.log(this);
    let query = {
      status: "rejected",
    };
    Meteor.call("update.cv.status", this._id, query, function (err) {});
  },
  "submit .acceptForm": function (event, template) {
    console.log(this);
    event.preventDefault();
    let cvId = this._id;
    let acceptNote = $(".acceptInput").val();
    let query = {
      status: "accepted",
      notes: acceptNote,
    };
    Meteor.call("update.cv.status", cvId, query, function (err) {
      if (err) {
        console.log(err);
      } else {
        Meteor.call("update.cv.notes", cvId, query, function (err) {
          console.log(err);
        });
      }
    });
  },
});
