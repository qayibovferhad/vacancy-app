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
Meteor.methods({
  "update.cv.status": function (cvId, query) {
    Cv.update(cvId, { $set: { status: query.status } });
  },
});
Meteor.methods({
  "update.cv.notes": function (cvId, query) {
    const updateQuery = {
      $set: {},
    };

    updateQuery.$set["notes"] = query.notes;

    Cv.update(cvId, updateQuery);
  },
});
