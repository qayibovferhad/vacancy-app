import { Cv } from "./collection";

Meteor.methods({
  "add.cv": function (data) {
    return Cv.insert(data);
  },
});
