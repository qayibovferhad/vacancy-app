import { Cv, Cv_Files } from "./collection";

Meteor.methods({
  "add.cv": function (data) {
    return Cv.insert(data);
  },
  "remove.cv": function (cvId) {
    return Cv.remove(cvId);
  },
  "update.cv.status": function (cvId, query) {
    return Cv.update(cvId, { $set: { status: query.status } });
  },
  "update.cv.notes": function (cvId, query) {
    const updateQuery = {
      $set: {},
    };

    updateQuery.$set["notes"] = query.notes;

    return Cv.update(cvId, updateQuery);
  },
  checkCvItem: function (query) {
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
  removeCvFile: function (cvId) {
    Cv_Files.remove({ _id: cvId });
  },
});
