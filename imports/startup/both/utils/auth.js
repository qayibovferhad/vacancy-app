import { FlowRouter } from "meteor/ostrio:flow-router-extra";
export const checkUserAndCeo = (context, redirect) => {
  const currentUser = Meteor.user();
  if (!currentUser) {
    redirect("/login");
  }
  const typeValue = currentUser?.profile?.typeValue;
  if (typeValue !== "ceo") {
    redirect("/");
  }
};
