// routes.js
// =====================================================================
var models = require("./models");

module.exports = function(router){
  // middleware to use for all requests
  router.use(function(req, res, next) {
    console.log(req.url);
    if(req.url != "/"){
      models.Users.findById(req.session.user_id).then(function(user){
        if(user){
          console.log("assign user to req.user");
          req.user = user;
          next();
        }
        else
          res.render("index/401");
      });
    }
    else{
      next();
    }
  });

  // ROUTE: "/"
  require("./controller/index.js")(router);
  // ROUTE: "/admin"
  require("./controller/admin.js")(router);
  // Route: "/admin/users"
  require("./controller/users.js")(router);


  return router;
}
