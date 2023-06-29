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
