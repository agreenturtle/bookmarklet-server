// controller/app.js
// ROUTE = "/admin/apps" & "/guest/apps"
// =====================================================================
var models = require("../models");
var helperFunction = require("../helper/helper.js");

var helper = helperFunction();


module.exports = function(router){
  router.route("/admin/apps")
    .get(function(req,res) {
      models.Apps.findAll().then(function(app_data){
        res.render("apps/index", {user:req.user, app_data:app_data});
      });
    })

    .post(function(req,res) {
      var code = req.body.code.replace(/(?:\r\n|\r|\n)/g,"%0A");
      helper.writeCodeToFile(req.body.app_name, req.body.code.replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&#x2F;/g,"/").replace(/&#39;/g,"'"));
      var new_app = models.Apps.build({
        app_name: req.body.app_name,
        code: code
      });
      models.Apps.findOne({ where:{app_name: req.body.app_name} }).then(function(app_data){
        if(app_data){ //Duplicate App Name
          res.render("apps/new",{user:req.user, duplicate:true, app_data: new_app})
        }
        else{
          new_app.save().then(function(){
            res.redirect("/admin/apps");
          });
        }
      })
    })

  router.route("/admin/apps/new")
    .get(function(req,res){
      res.render("apps/new", {user:req.user});
    })

  router.route("/admin/apps/:id")
    .get(function(req,res){
      models.Apps.findOne({ where:{id:req.params.id} }).then(function(app_data){
        res.render("apps/show",{user:req.user, app_data:app_data});
      });
    })

    .put(function(req,res){
      var code = req.body.code.replace(/(?:\r\n|\r|\n)/g,"%0A");
      helper.writeCodeToFile(req.body.app_name, req.body.code.replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&#x2F;/g,"/").replace(/&#39;/g,"'"));
      models.Apps.update({
        code: code
      },{
        where:{
          id: req.params.id
        }
      }).then(function(){
        res.redirect("/admin/apps");
      });
    })

    .delete(function(req,res){
      models.Apps.findById(req.params.id).then(function(app_data){
        app_data.destroy().then(function(){
          res.redirect("/admin/apps");
        });
      })
    })

  router.route("/guest/apps")
    .get(function(req,res) {
      models.Apps.findAll().then(function(app_data){
        res.render("guest/apps/index", {user:req.user, app_data:app_data});
      });
    })
}
