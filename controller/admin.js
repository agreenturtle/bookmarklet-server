// controller/index.js
// ROUTE = "/admin"
// =====================================================================

module.exports = function(router){
  router.get("/admin", function(req,res){
    res.render("admin/index", {user: req.user});
  });
}
