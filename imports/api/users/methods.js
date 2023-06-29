Meteor.methods({
  "add.user": function (data) {
    let res = Accounts.createUser({
      username: data.username,
      email: data.email,
      password: data.password,
      profile: {
        firstname: data.firstname,
        lastname: data.lastname,
        typeValue: data.typeValue,
        registerDate: new Date(),
      },
    });
    return res;
  },
});
Meteor.methods({
  "update.userCv": function (userId, data) {
    Meteor.users.update(
      {
        _id: userId,
      },
      {
        $set: {
          skills: data.skills,
          position: data.position,
          age: data.age,
          education: data.education,
          experience: data.experience,
        },
      }
    );
  },
});
