import "./login.html";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.login.events({
  "submit #loginForm": function (event, template) {
    event.preventDefault();
    let username = $("#username").val();
    let password = $("#password").val();
    console.log(username, password);
    Meteor.loginWithPassword(username, password, function (err) {
      if (err) {
        console.log("err", err);
      } else {
        FlowRouter.go("/");
      }
    });
  },
});
