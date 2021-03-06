// server.js
// =====================================================================

// BASE SETUP
// =====================================================================
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var expressSession = require("express-session");
var mustacheExpress = require("mustache-express");

var app = express();
app.set("port", 7000);
app.set("views", __dirname + "/views");

// SET ENGINE TEMPLATE
// =====================================================================
app.set("script", __dirname + "/scripts");
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

app.use(methodOverride("_method"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended:true} ));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

// PASSWORDS
// =====================================================================
var SESSION_SECRET=process.env.SESSION_SECRET.toString();
app.use(expressSession( {secret:SESSION_SECRET, resave:true, saveUninitialized: true} ));

// START SERVER
// ===========================================================================
var port=process.env.PORT || 7000
app.listen(port);
console.log("Express server listening on port " + port);

// ROUTES FOR OUR API
// =====================================================================
var router = express.Router();
app.use(require("./routes.js")(router));
