// controller/api.js
// ROUTE = "/api"
// =====================================================================
var models = require("../models");
var path = require('path');

module.exports = function(router){
  router.get("/api/wsb.json", function(req,res){
    models.Mappings.findAll().then(function(mappings){
      res.sendFile(path.resolve('public/js/wsb-code.js'));
    });
  });

  router.get("/api/sh-bookmarklet.json", function(req,res){
    models.Mappings.findAll().then(function(mappings){
      res.sendFile(path.resolve('public/js/sh-bookmarklet.js'));
    });
  });
}
