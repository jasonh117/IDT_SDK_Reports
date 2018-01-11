var express = require('express');
var multer  = require('multer');
var path  = require('path');
var fs = require('fs');
var moment = require('moment');
var formidable = require('express-formidable');
var router = express.Router();
var nconf = require('nconf');
var password = nconf.get('PASSWORD');

var dir = 'public/reports';
if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/reports')
  },
  filename: function (req, file, cb) {
    var extension = path.extname(file.originalname);
    cb(null, path.basename(file.originalname, extension) + '_' + moment().format('Y-MM-DD_HH-mm-ss') + extension);
  }
})

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    cb(null, path.extname(file.originalname) == '.txt');
  }
})

router.post('/', upload.any(), function (req, res, next) {
  if (req.body.password !== password) {
    req.files.map(file => {
      if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
    });
    res.status(401).send("incorrect password\n");
  }
  res.end();
})

module.exports = router;
