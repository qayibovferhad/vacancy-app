import { Mongo } from "meteor/mongo";
import { FilesCollection } from "meteor/ostrio:files";

export const Cv = new Mongo.Collection("cv");

export const Cv_Files = new FilesCollection({
  collectionName: "Cv_Files",
  storagePath: "/Users/Admin/Documents/images",
  allowClientCode: false,
  onBeforeUpload: function (file) {
    if (file.size <= 10485760 && /png|jpg|pdf|jpeg/i.test(file.extension)) {
      return true;
    }
    return "Please upload image,with size equal or less than 10MB";
  },
});
