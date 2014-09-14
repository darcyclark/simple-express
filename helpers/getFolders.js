// returns list of subdirectories in a directory

var Finder = require('fs-finder');

var getFolders = function (dir) {
  result = [];
  folders = Finder.in(dir).findDirectories();   
  folders.forEach( function(folder) {
    foldername = folder.substring(folder.lastIndexOf('/')+1)
    result.push(foldername);
  });
  return result;
};

module.exports = getFolders;
