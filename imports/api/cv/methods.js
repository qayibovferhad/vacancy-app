import { Cv } from "./collection";

Meteor.methods({
  "add.cv": function (data) {
    return Cv.insert(data);
  },
});
Meteor.methods({
  "remove.cv": function (cvId) {
    return Cv.remove(cvId);
  },
});
