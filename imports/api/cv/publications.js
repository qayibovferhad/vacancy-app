import { Cv } from "./collection";

Meteor.publish({
  "get.cv": function (query = {}) {
    return Cv.find(query);
  },
});
