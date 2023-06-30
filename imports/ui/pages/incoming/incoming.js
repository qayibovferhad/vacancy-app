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
  getMyIncoming: function () {
    let ceoId = Meteor.userId();
    return Cv.find({ ownCeoId: ceoId }).fetch();
  },
  getImg: function (imgId) {
    console.log(imgId);
    let cvImage = Cv_Files.findOne({ _id: imgId });
    if (cvImage) {
      console.log(cvImage);
      return cvImage.link();
    } else {
      return "/default-image.jpg";
    }
  },
});
