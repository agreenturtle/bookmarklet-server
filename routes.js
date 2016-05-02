// routes.js
// =====================================================================
var models = require("./models");

module.exports = function(router){
  // middleware to use for all requests
  router.use(function(req, res, next) {
    if(req.url != "/"){
      models.User.findById(req.session.user_id).then(function(user){
        if(user){
          req.user = user;
          next();
        }
        else{
          res.render("index/401");
        }
      });
    }
  });

  // ROUTE: "/"
  require("./controller/index.js")(router);

  // ROUTE: "/admin"
  require("./controller/admin.js")(router);
  return router;
}
