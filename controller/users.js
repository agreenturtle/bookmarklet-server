// controller/users.js
// ROUTE = "/admin/users"
// =====================================================================
var models = require("../models");

module.exports = function(router){
  router.route("/admin/users")
    .get(function(req,res) {
      models.Users.findAll().then(function(users){
        res.render("users/index", {user:req.user, all_users:users});
      });
    })

    .post(function(req,res) {
      var new_user = models.Users.build({
        username: req.body.username,
        password: req.body.password,
        permission: req.body.permission
      });
      models.Users.findOne({ where:{username: req.body.username} }).then(function(user){
        if(user){ //Duplicate User
          res.render("users/new",{user:req.user, duplicate:true, user_data: new_user})
        }
        else{
          new_user.save().then(function(){
            res.redirect("/admin/users");
          });
        }
      })
    })

  router.route("/admin/users/new")
    .get(function(req,res){
      res.render("users/new", {user:req.user});
    })

  router.route("/admin/users/:id")
    .get(function(req,res){
      models.Users.findOne({ where:{id:req.params.id} }).then(function(edit_user){
        res.render("users/show",{user:req.user, user_data:edit_user});
      });
    })

    .put(function(req,res){
      console.log("ID: ", req.params.id);
      models.Users.update({
        password: req.body.password,
        permission: req.body.permission
      },{
        where:{
          id: req.params.id
        }
      }).then(function(){
        res.redirect("/admin/users");
      });
    })

    .delete(function(req,res){
      models.Users.findById(req.params.id).then(function(user){
        user.destroy().then(function(){
          res.redirect("/admin/users");
        });
      })
    })


}
