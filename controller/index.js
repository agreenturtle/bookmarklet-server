// controller/index.js
// ROUTE = "/"
// =====================================================================
var models = require("../models");

module.exports = function(router){
  router.route("/")
    .get(function(req,res) {
      if(req.params.action == "logout"){
        req.user = null;
        req.session.user_id = null;
        res.render("index/login");
      }
      else{
        res.render("index/login");
      }
    })

    .post(function(req,res) {
      models.Users.findOne( {where:{username: req.body.username} }).then(function(user){
        if( user && user.password == req.body.password){
          req.session.user_id = user.id;
          if(user.permission == "Admin")
            res.redirect("/admin");
          else
            res.redirect("/guest");
        }
        else {
          res.render("index/401");
        }
      })

    })
}
