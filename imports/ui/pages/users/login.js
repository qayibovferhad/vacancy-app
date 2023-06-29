import "./login.html";
Template.login.events({
  "submit #loginForm": function (event, template) {
    event.preventDefault();
    let username = $("#username").val();
    let password = $("#password").val();
    console.log(username, password);
    Meteor.loginWithPassword(username, password, function (err) {
      console.log("err", err);
    });
  },
});
