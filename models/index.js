// models/index.js
var Sequelize = require("sequelize");

var db = {};

// DB CONNECTIONS
// ===========================================================================
console.log("DB: ", process.env.BOOKMARKLET_DB,",Username: ", process.env.BOOKMARKLET_DB_USERNAME,",Password: ", process.env.BOOKMARKLET_DB_PASSWORD, ",Host: ",process.env.BOOKMARKLET_HOST)
var bookmarkletDB = new Sequelize(process.env.BOOKMARKLET_DB, process.env.BOOKMARKLET_DB_USERNAME, process.env.BOOKMARKLET_DB_PASSWORD, {
  dialect: "mysql",
  host: process.env.BOOKMARKLET_HOST,
  port: 3306
});

var Mapping = bookmarkletDB.import(__dirname + "/mapping");
var User = bookmarkletDB.import(__dirname + "/user");

Mapping.sync({force: true}).then(function () {
  // Table created
  return;
});

User.sync({force: true}).then(function () {
  // Table created
  return User.create({
    username: 'admin',
    password: 'letmein',
    permission: 'admin'    
  });
});

db["Mapping"] = Mapping;
db["User"] = User;
// ===========================================================================

db.dbConn = bookmarkletDB;
module.exports = db;
