import "./register.html";
Template.register.events({
  "submit #registerForm": function (event, template) {
    event.preventDefault();
    let firstname = $("#firstname").val();
    let lastname = $("#lastname").val();
    let username = $("#username").val();
    let email = $("#email").val();
    let password = $("#password").val();
    let typeValue;
    let element = document.getElementsByName("type");
    for (i = 0; i < element.length; i++) {
      if (element[i].checked) {
        typeValue = element[i].value;
      }
    }
    let data = {
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
      password: password,
      typeValue,
    };
    if (firstname && lastname && username && email && password && typeValue) {
      Meteor.call("add.user", data);
    } else {
      let alertWindow = document.querySelector(".alertWindow");
      alertWindow.innerHTML = `<h1> Please fill all fields</h1>`;
      setTimeout(function () {
        alertWindow.remove();
      }, 2000);
    }
  },
});
