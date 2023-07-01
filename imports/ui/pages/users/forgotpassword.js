import "./forgotpassword.html";
Template.forgotpassword.events({
  "submit #forgotpassword": function (event, template) {
    event.preventDefault();
    let target = event.target;
    let email = target.email.value;
    console.log(email);

    Accounts.forgotPassword({ email: email }, function (err) {
      if (!err) {
        alert("Size mail geldi!");
      } else {
        console.log("err", err);
      }
    });
  },
});
