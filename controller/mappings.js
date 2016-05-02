// controller/mappings.js
// ROUTE = "/admin/mappings"
// =====================================================================
var models = require("../models");

module.exports = function(router){
  router.route("/admin/mappings")
    .get(function(req,res) {
      models.Mappings.findAll().then(function(mappings){
        res.render("mappings/index", {user:req.user, mappings:mappings});
      });
    })

    .post(function(req,res) {
      var new_mapping = models.Mappings.build({
        type: req.body.type,
        mapping: req.body.mapping
      });
      models.Mappings.findOne({ where:{type: req.body.type} }).then(function(mapping){
        if(mapping){ //Duplicate Mapping Type
          res.render("mappings/new",{user:req.user, duplicate:true, mapping_data: new_mapping})
        }
        else{
          new_mapping.save().then(function(){
            res.redirect("/admin/mappings");
          });
        }
      })
    })

  router.route("/admin/mappings/new")
    .get(function(req,res){
      res.render("mappings/new", {user:req.user});
    })

  router.route("/admin/mappings/:id")
    .get(function(req,res){
      models.Mappings.findOne({ where:{id:req.params.id} }).then(function(mapping){
        res.render("mappings/show",{user:req.user, mapping_data:mapping});
      });
    })

    .put(function(req,res){
      models.Mappings.update({
        mapping: req.body.mapping
      },{
        where:{
          id: req.params.id
        }
      }).then(function(){
        res.redirect("/admin/mappings");
      });
    })

    .delete(function(req,res){
      models.Mappings.findById(req.params.id).then(function(mapping){
        mapping.destroy().then(function(){
          res.redirect("/admin/mappings");
        });
      })
    })
}
