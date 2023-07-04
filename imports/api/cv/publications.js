import { Jobs } from "../jobs/collection";
import { Cv, Cv_Files } from "./collection";

Meteor.publishComposite("get.cv", function (query = {}) {
  return {
    find() {
      return Cv.find(query);
    },
    children: [
      {
        find(cv) {
          if (cv.imgId) {
            return Cv_Files.find({ _id: cv.imgId }).cursor;
          }
        },
      },
      {
        find(cv) {
          if (cv.jobId) {
            return Jobs.find({ jobId: cv.jobId });
          }
        },
      },
      {
        find(cv) {
          if (cv.userId) {
            return Meteor.users.find({ _id: cv.userId });
          }
        },
      },
    ],
  };
});
