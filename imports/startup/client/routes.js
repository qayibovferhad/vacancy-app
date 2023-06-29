import "../../ui/layout/mainLayout";
import "../../ui/components/navigation/navigation";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

import "../../ui/pages/home/home";
FlowRouter.route("/", {
  name: "App.home",
  action() {
    BlazeLayout.render("mainLayout", {
      main: "home",
      login: "home",
    });
  },
});

import "../../ui/pages/users/register";
FlowRouter.route("/register", {
  name: "App.register",
  action() {
    BlazeLayout.render("mainLayout", {
      main: "register",
      login: "register",
    });
  },
});
import "../../ui/pages/users/login";
FlowRouter.route("/login", {
  name: "App.login",
  action() {
    BlazeLayout.render("mainLayout", {
      main: "login",
      login: "login",
    });
  },
});

import "../../ui/pages/jobapplication/jobapplication";

FlowRouter.route("/jobapplication", {
  name: "App.jobapplication",
  action() {
    BlazeLayout.render("mainLayout", {
      main: "jobapplication",
      login: "jobapplication",
    });
  },
});
import "../../ui/pages/jobapplication/createjob";

FlowRouter.route("/createjob", {
  name: "App.createjob",
  action() {
    BlazeLayout.render("mainLayout", {
      main: "createjob",
      login: "createjob",
    });
  },
});
import "../../ui/pages/jobapplication/findjob";
FlowRouter.route("/findjob", {
  name: "App.findjob",
  action() {
    BlazeLayout.render("mainLayout", {
      main: "findjob",
      login: "findjob",
    });
  },
});
