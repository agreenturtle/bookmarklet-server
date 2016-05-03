// controller/guest.js
// ROUTE = "/guest"
// =====================================================================

module.exports = function(router){
  router.get("/guest", function(req,res){
    res.render("guest/index", {user: req.user});
  });
}
