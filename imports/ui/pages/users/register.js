import "./register.html";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.register.events({
  "change input[name='type']": function (event, template) {
    const typeValue = event.target.value;
    if (typeValue === "ceo") {
      document.getElementById("companyInput").className = "d-block";
    } else {
      document.getElementById("companyInput").className = "d-none";
    }
  },

  "submit #registerForm": function (event, template) {
    event.preventDefault();
    let firstname = $("#firstname").val();
    let lastname = $("#lastname").val();
    let username = $("#username").val();
    let email = $("#email").val();
    let password = $("#password").val();
    let companyName = $("#company").val();
    let element = document.getElementsByName("type");
    let typeValue;

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

    if (typeValue === "ceo") {
      companyName = $("#company").val();
      data.companyName = companyName;
    }

    if (firstname && lastname && username && email && password && typeValue) {
      Meteor.call("add.user", data, function (err) {
        if (err) {
          console.log(err);
        } else {
          FlowRouter.go("/login");
        }
      });
    } else {
      let alertWindow = document.querySelector(".alertWindow");
      alertWindow.innerHTML = `<h1> Please fill all fields</h1>`;
      setTimeout(function () {
        alertWindow.remove();
      }, 2000);
    }
  },
});
