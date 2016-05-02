// routes.js
// =====================================================================
var models = require("./models");

module.exports = function(router){
  // middleware to use for all requests
  router.use(function(req, res, next) {
    console.log("router: req.url : ",req.url);
    console.log("user_id: ", req.session.user_id);
    if(req.url != "/"){
      models.User.findById(req.session.user_id).then(function(user){
        if(user){
          req.user = user;
          next();
        }
        else
          res.render("index/401");
      });
    }
    next();
  });

  // ROUTE: "/"
  require("./controller/index.js")(router);

  // ROUTE: "/admin"
  require("./controller/admin.js")(router);
  return router;
}
