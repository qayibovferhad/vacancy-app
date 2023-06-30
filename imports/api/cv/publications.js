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
    ],
  };
});

// Meteor.publish({
//     "get.cv.file":function(){

//     }
// })
// Meteor.publish({
//   "get.cv": function (query = {}) {
//     return Cv.find(query);
//   },
// });
