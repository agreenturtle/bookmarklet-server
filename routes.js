// routes.js
// =====================================================================
var models = require("./models");

module.exports = function(router){
  // middleware to use for all requests
  router.use(function(req, res, next) {
    if(req.url != "/" && req.url != "/api.json"){
      models.Users.findById(req.session.user_id).then(function(user){
        if(user){
          if(req.url.indexOf("/admin")>-1 && user.permission != "Admin"){
            res.render("index/401");
          }
          else{
            req.user = user;
            next();
          }
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
  // Route: "/admin/mappings"
  require("./controller/mappings.js")(router);
  // Route: "/admin/guests"
  require("./controller/guest.js")(router);
  // Route: /api.json"
  require("./controller/api.js")(router);

  return router;
}
