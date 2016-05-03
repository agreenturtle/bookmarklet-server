var Mapping = function(sequelize, DataTypes){
  return sequelize.define("Mappings", {
    type: {type: DataTypes.STRING},
    mapping: {type: DataTypes.TEXT('long')}
  },
  {
      //instanceMethods
  });
}

module.exports = Mapping;
