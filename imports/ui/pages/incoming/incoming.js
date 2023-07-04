import { Cv, Cv_Files } from "../../../api/cv/collection";
import { Jobs } from "../../../api/jobs/collection";
import "./incoming.html";

Template.incoming.onCreated(function () {
  this.autorun(() => {
    let query = {
      ownCeoId: Meteor.userId(),
    };
    this.subscribe("get.cv", query);
  });
  this.autorun(() => {
    let query = {
      ownCeoId: Meteor.userId(),
    };
    let cvCursor = Cv.find(query);
    let cvId = cvCursor.map((cv) => cv.userId);
    this.subscribe("get.users", { _id: { $in: cvId } });
  });
});

Template.incoming.helpers({
  isAccepted: function () {
    return this.status === "accepted";
  },
  isRejected: function () {
    return this.status === "rejected";
  },
  getUserInfo: function (userId) {
    const user = Meteor.users.findOne(userId);
    return user;
  },
  getJobInfo: function (jobId) {
    const job = Jobs.findOne({ jobId: jobId });
    return job;
  },
  getMyIncoming: function () {
    let ceoId = Meteor.userId();
    return Cv.find({ ownCeoId: ceoId }).fetch();
  },
  getImg: function (imgId) {
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
    const cvId = event.currentTarget.dataset.cv; // event.currentTarget kullanıldı
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
    Meteor.call("update.cv.status", this._id, query, function (err) {
      if (err) {
        console.log(err);
      }
    });
  },

  "submit form.acceptForm": function (event, template) {
    console.log(this);
    event.preventDefault();
    let cvId = this._id;
    let acceptNote = $(event.currentTarget).find(".acceptInput").val();
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
