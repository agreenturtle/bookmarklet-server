// controller/api.js
// ROUTE = "/api"
// =====================================================================
var models = require("../models");
var path = require('path');

module.exports = function(router){
  router.get("/api/:app_name", function(req,res){
    var file_name = path.resolve('/public/code-files/'+req.params.app_name);
    models.Mappings.findAll().then(function(mappings){
      res.sendFile(path.resolve(file_name));
    });
  });
  /* 
  router.get("/api/sh-bookmarklet", function(req,res){
    models.Mappings.findAll().then(function(mappings){
      res.sendFile(path.resolve('public/code-files/sh-bookmarklet.js'));
    });
  });
  */
}
