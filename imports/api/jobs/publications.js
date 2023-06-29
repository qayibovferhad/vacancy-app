import { Jobs } from "./collection";
Meteor.publish({
  "get.jobs": function (query = {}) {
    return Jobs.find(query);
  },
});
