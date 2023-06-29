import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
export const Jobs = new Mongo.Collection("jobs");

const Schema = {};
Schema.Job = new SimpleSchema({
  ownCeoId: {
    type: String,
  },
  jobId: {
    type: String,
  },
  title: {
    type: String,
  },
  companyname: {
    type: String,
  },
  typeofemployment: {
    type: String,
  },
  salary: {
    type: Number,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    autoValue: function () {
      return new Date();
    },
  },
});

export const jobValidationText = Schema.Job.namedContext("job");
Jobs.attachSchema(Schema.Job);
