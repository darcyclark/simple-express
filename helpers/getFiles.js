// reads a directory of Markdown wiki-formatted text files
// and strips off any YAML
// converts YAML to JSON
// so we can slice and dice it later for menus and indexes etc..

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
    // read file and parse yaml
    var out = yaml(fs.readFileSync(file, 'utf-8'));
    // augment and flatten metadata
    out.attributes.file = file;
    out.attributes.filename = filename;
    out.attributes.content = out.body;
    result.push(out.attributes);
  });
  return result;
};

module.exports = getFiles;
