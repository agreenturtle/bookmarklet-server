// controller/index.js
// ROUTE = "/"
// =====================================================================

module.exports = function(router){
  router.get("/", function(req,res){
    res.render("index/index");
  });
}