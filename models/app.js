var App = function(sequelize, DataTypes){
  return sequelize.define("App", {
    app_name: {type: DataTypes.STRING},
    code: {type: DataTypes.TEXT('long')}
  },
  {
      //instanceMethods
  });
}

module.exports = App;
