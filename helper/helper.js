var fs = require("fs");
var path = require("path");

function helperFunction(){
  this.dict = {
    //application:path
    "wsb-code":path.resolve('public/js/wsb-code.js'),
    "sh-bookmarklet":path.resolve('public/js/sh-bookmarklet.js')
  }
}

helperFunction.prototype.writeCodeToFile = function(app_name, code){
  console.log(app_name);
  fs.writeFile(this.dict[app_name], code, function(err){
    if(err){
      return console.log(err);
    }
    console.log("File was successfully saved");
  })
}

module.exports = function(){
  return (new helperFunction());
}
