import "../../ui/layout/mainLayout";
import "../../ui/components/navigation/navigation";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
const checkCurrentUserAndUser = (context, redirect) => {
  const currentUser = Meteor.userId();
  if (!currentUser) {
    redirect("/login");
  }
};
const checkCurrentUserAndCeo = (context, redirect) => {
  const currentUser = Meteor.userId();
  if (!currentUser) {
    redirect("/login");
  }
};
const checkLoginUser = (context, redirect) => {
  const currentUser = Meteor.userId();
  if (currentUser) {
    redirect("/");
  }
};
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
  triggersEnter: [checkLoginUser],
  action() {
    BlazeLayout.render("mainLayout", {
      login: "register",
    });
  },
});

import "../../ui/pages/users/login";
FlowRouter.route("/login", {
  name: "App.login",
  triggersEnter: [checkLoginUser],
  action() {
    BlazeLayout.render("mainLayout", {
      login: "login",
    });
  },
});

import "../../ui/pages/users/forgotpassword";
FlowRouter.route("/forgotpassword", {
  name: "App.forgotpassword",
  triggersEnter: [checkLoginUser],
  action() {
    BlazeLayout.render("mainLayout", {
      login: "forgotpassword",
    });
  },
});

import "../../ui/pages/jobapplication/jobapplication";
FlowRouter.route("/jobapplication", {
  name: "App.jobapplication",
  triggersEnter: [checkCurrentUserAndCeo],
  action() {
    BlazeLayout.render("mainLayout", {
      main: "jobapplication",
    });
  },
});

import "../../ui/pages/jobapplication/createjob";
FlowRouter.route("/createjob", {
  name: "App.createjob",
  triggersEnter: [checkCurrentUserAndCeo],
  action() {
    BlazeLayout.render("mainLayout", {
      main: "createjob",
    });
  },
});

import "../../ui/pages/jobapplication/findjob";
FlowRouter.route("/findjob", {
  name: "App.findjob",
  triggersEnter: [checkCurrentUserAndUser],
  action() {
    BlazeLayout.render("mainLayout", {
      main: "findjob",
    });
  },
});

import "../../ui/pages/jobapplication/jobdetail";
FlowRouter.route("/jobdetail/:_id", {
  name: "App.jobdetail",
  action() {
    BlazeLayout.render("mainLayout", {
      main: "jobdetail",
    });
  },
});

import "../../ui/pages/incoming/incoming";
FlowRouter.route("/incoming", {
  name: "App.incoming",
  triggersEnter: [checkCurrentUserAndCeo],
  action() {
    BlazeLayout.render("mainLayout", {
      main: "incoming",
    });
  },
});
