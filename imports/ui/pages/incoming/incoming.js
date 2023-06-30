import { Cv } from "../../../api/cv/collection";
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
});
