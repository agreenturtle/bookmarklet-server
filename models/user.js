var User = function(sequelize, DataTypes){
  return sequelize.define("Users", {
    username: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
    permission: {type: DataTypes.STRING}
  },
  {
    instanceMethods:{
      isAdmin: function(){
        if(this.permission == "admin")
          return true;
        else
          return null;
      },
      isGuest: function(){
        if(this.permission == "guest")
          return true;
        else
          return null;
      }
    }
  });
}

module.exports = User;
