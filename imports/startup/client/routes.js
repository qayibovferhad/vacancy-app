import "../../ui/layout/mainLayout";
import "../../ui/components/navigation/navigation";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

const checkCurrentUserAndUser = (context, redirect) => {
  const currentUser = Meteor.userId();
  if (!currentUser) {
    redirect("/login");
  } else {
    const currentUserType = Meteor.user()?.profile?.typeValue;
    console.log(currentUserType);
    if (currentUserType !== "user") {
      redirect("/");
    }
  }
};

const checkCurrentUserAndCeo = (context, redirect) => {
  const currentUser = Meteor.userId();
  if (!currentUser) {
    redirect("/login");
  } else {
    const currentUserType = Meteor.user()?.profile?.typeValue;
    console.log(currentUserType);
    if (currentUserType !== "ceo") {
      redirect("/");
    }
  }
};

const checkLoginUser = (context, redirect) => {
  const currentUser = Meteor.userId();
  if (currentUser) {
    redirect("/");
  }
};
const checkUser = (context, redirect) => {
  const currentUser = Meteor.userId();
  if (!currentUser) {
    redirect("/login");
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
import "../../ui/pages/users/changePassword";
FlowRouter.route("/changepassword", {
  name: "App.changePassword",
  triggersEnter: [checkUser],
  action() {
    BlazeLayout.render("mainLayout", {
      main: "changePassword",
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

import "../../ui/pages/createjob/createjob";
FlowRouter.route("/createjob", {
  name: "App.createjob",
  triggersEnter: [checkCurrentUserAndCeo],
  action() {
    BlazeLayout.render("mainLayout", {
      main: "createjob",
    });
  },
});

import "../../ui/pages/findjob/findjob";
FlowRouter.route("/findjob", {
  name: "App.findjob",
  triggersEnter: [checkCurrentUserAndUser],
  action() {
    BlazeLayout.render("mainLayout", {
      main: "findjob",
    });
  },
});

import "../../ui/pages/jobdetail/jobdetail";
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
import "../../ui/pages/notFound/notFound";
FlowRouter.route("*", {
  name: "App.notFound",
  action() {
    BlazeLayout.render("mainLayout", {
      main: "notFound",
      login: "notFound",
    });
  },
});
