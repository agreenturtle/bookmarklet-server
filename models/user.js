var User = function(sequelize, DataTypes){
  return sequelize.define("Users", {
    username: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
    permission: {type: DataTypes.STRING}
  },
  {
      //instanceMethods
  });
}

module.exports = User;
