// reads a directory of images

var Finder = require('fs-finder');
var fs = require('fs');

var getImages = function (dir) {
  result = [];
  images = Finder.in(dir).findFiles('<\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$>');
  images.forEach( function(image) {
    filename = image.substring(image.lastIndexOf('/')+1)
    result.push(filename);
  });
  return result;
};

module.exports = getImages;
