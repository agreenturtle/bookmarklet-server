// models/index.js
var Sequeelize = require("sequelize");

var db = {};

// DB CONNECTIONS
// ===========================================================================
var bookmarkletDB = new Sequelize(process.env.BOOKMARKLET_DB, process.env.BOOKMARKLET_DB_USERNAME, process.env.BOOKMARKLET_DB_PASSWORD, {
  dialect: "mysql",
  host: process.env.BOOKMARKLET_DB_HOST,
  port: 3306
});

var Mapping = bookmarkletDB.import(__dirname + "/code");
var User = bookmarkletDB.import(__dirname + "/user");

db["Mapping"] = Mapping;
db["User"] = User;
// ===========================================================================

db.dbConn = bookmarkletDB;

module.exports = db;
