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
        company: data.companyName,
        registerDate: new Date(),
      },
    });
    return res;
  },
  "update.userCv": function (userId, data) {
    return Meteor.users.update(
      {
        _id: userId,
      },
      {
        $set: {
          "profile.skills": data.skillsArr,
          "profile.position": data.position,
          "profile.age": data.age,
          "profile.education": data.education,
          "profile.experience": data.experience,
          "profile.imgId": data.imgId,
        },
      }
    );
  },
});
