// models/index.js
var Sequelize = require("sequelize");

var db = {};

// DB CONNECTIONS
// ===========================================================================
var bookmarkletDB = new Sequelize(process.env.BOOKMARKLET_DB, process.env.BOOKMARKLET_DB_USERNAME, process.env.BOOKMARKLET_DB_PASSWORD, {
  dialect: "mysql",
  host: process.env.BOOKMARKLET_HOST,
  port: 3306,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

var App = bookmarkletDB.import(__dirname + "/app");
var User = bookmarkletDB.import(__dirname + "/user");

App.sync({force: false}).then(function () {
  // Table created
  return;
});

User.sync({force: false}).then(function () {
  // Table created
  User.findOne({where:{username:"admin"}}).then(function(user){
    if(!user){
      return User.create({
        username: 'admin',
        password: process.env.ADMIN_PASSWORD,
        permission: 'Admin'
      });
    }
    else {
      return;
    }
  })
});

db["Apps"] = App;
db["Users"] = User;
// ===========================================================================

db.dbConn = bookmarkletDB;
module.exports = db;
