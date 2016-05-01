var Mapping = function(sequelize, DataTypes){
  return sequelize.define("Code", {
    type: {type: DataTypes.STRING},
    mapping: {type: DataTypes.STRING}
  },
  {
      //instanceMethods
  })
}

module.exports = Mapping;
