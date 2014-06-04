var yaml = require('front-matter');
var Finder = require('fs-finder');
var fs = require('fs');

var getFiles = function (dir) {
  result = [];
  files = Finder.in(dir).findFiles('*.md');
  files.forEach( function(file) {
    // strip off path and .extension
    filename = file.substring(file.lastIndexOf('/')+1)
    filename = filename.substring(0, filename.lastIndexOf('.'))
    // add metadata
    var out = yaml(fs.readFileSync(file, 'utf-8'));
    out.attributes.file = file;
    out.attributes.filename = filename;
    result.push(out.attributes);
  });
  return result;
};

module.exports = getFiles;
