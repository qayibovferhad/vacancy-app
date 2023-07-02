import { Jobs } from "./collection";
Meteor.methods({
  "add.job": function (data) {
    return Jobs.insert(data);
  },
});
Meteor.methods({
  "remove.job": function (jobId) {
    return Jobs.remove(jobId);
  },
});
Meteor.methods({
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
