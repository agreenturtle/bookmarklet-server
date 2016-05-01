// routes.js
// =====================================================================

module.exports = function(router){
  // middleware to use for all requests
  router.use(function(req, res, next) {
    next();
  });

  // ROUTE: "/"
  require("./controller/index.js")(router);

  return router;
}
