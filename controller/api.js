// controller/api.js
// ROUTE = "/api"
// =====================================================================
var models = require("../models");
var path = require('path');

module.exports = function(router){
  router.get("/api.json", function(req,res){
    models.Mappings.findAll().then(function(mappings){
      res.sendFile(path.resolve('public/js/wsb-code.js'));
    });
  });
}
