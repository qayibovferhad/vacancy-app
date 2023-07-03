import { Jobs } from "./collection";
Meteor.methods({
  "add.job": function (data) {
    return Jobs.insert(data);
  },
  "remove.job": function (jobId) {
    return Jobs.remove(jobId);
  },
  "update.job": function (jobId, query) {
    return Jobs.update(
      { _id: jobId },
      {
        $set: {
          typeofemployment: query.typeofemployment,
          salary: query.salary,
          description: query.description,
        },
      }
    );
  },
});
