var User = function(sequelize, DataTypes){
  return sequelize.define("User", {
    username: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
    permission: {type: DataTypes.STRING}
  },
  {
      //instanceMethods
  });
}

User.sync({force: true}).then(function () {
  // Table created
  return User.create({
    username: "admin",
    password: process.env.ADMIN_PASSWORD,
    permission: "admin"
  });
});

module.exports = User;
