import { Jobs } from "./collection";
Meteor.publish({
  "get.jobs": function (query = {}) {
    // query.userId = Meteor.userId();
    return Jobs.find(query);
  },
});
