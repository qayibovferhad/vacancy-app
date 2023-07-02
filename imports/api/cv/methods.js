import { Cv, Cv_Files } from "./collection";

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
Meteor.methods({
  checkCvItem(query) {
    const userId = Meteor.userId();
    const existingItem = Cv.findOne({
      userId,
      jobId: query.jobId,
    });
    if (existingItem) {
      throw new Meteor.Error(
        "item-already-exists",
        "The item already exists in the cv ."
      );
    }

    function checkCommonElement(arr1, arr2) {
      for (let i = 0; i < arr1.length; i++) {
        if (arr2.includes(arr1[i])) {
          return true;
        }
      }
      return false;
    }
    if (!checkCommonElement(query.userSkills, query.wishSkills)) {
      throw new Meteor.Error("Your skills are not allowed to be applied");
    }
    if (query.userExperience < query.wishExperience) {
      throw new Meteor.Error("Your experience is not allowed to be applied");
    }
  },
});
Meteor.methods({
  removeCvFile: function (cvId) {
    Cv_Files.remove({ _id: cvId });
  },
});
