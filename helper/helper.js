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
  var file_path = path.resolve('public/code-files/' + app_name + '.js');
  fs.writeFile(file_path, code, function(err){
    if(err){
      return console.log(err);
    }
    console.log("File was successfully saved");
  });
}

helperFunction.prototype.removeFile = function(app_name){
  var file_path = path.resolve('public/code-files/' + app_name + '.js');
  fs.unlinkSync(file_path, function(err){
    if(err){
      return console.log(err);
    }
    console.log("File has been deleted");
  });
}

module.exports = function(){
  return (new helperFunction());
}
