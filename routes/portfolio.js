// ********************************************
//
// Run this in root of project to generate thumbnails
//
// rm -rf views/portfolio/thumbs
// node node_modules/quickthumb/bin/make-thumb.js views/portfolio/ views/portfolio/thumbs/ 100x100 -r
//
// ********************************************

var express = require('express');
var router = express.Router();
var fs = require('fs');
var _ = require('underscore');
_.str = require('underscore.string');
var getFolders = require('../helpers/getFolders.js');
var getImages = require('../helpers/getImages.js');
    
// response middleware - augments other routes below

router.use(function(req, res, next) {
  folders = getFolders("./public/img/portfolio/");
  next();
});

// portfolio index

router.get('/', function(req, res) {
  res.render('portfolio/index', { title: 'Portfolio Index' });
});

// per folder index

router.get('/:folder', function(req, res) {
  images = getImages("./public/img/portfolio/" + req.params.folder)
  res.render('portfolio/folder', { folder: req.params.folder, title: 'Folder: ' + _.str.capitalize(req.params.folder) });
});

module.exports = router;
