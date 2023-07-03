import "./changePassword.html";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.changePassword.events({
  "submit #changepassword": function (event, template) {
    event.preventDefault();
    let oldpassword = $("#oldpassword").val();
    let newpassword = $("#newpassword").val();
    Accounts.changePassword(oldpassword, newpassword, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("success");
        FlowRouter.go("/");
      }
    });
  },
});
