const express = require('express');
const fs = require('fs');
const path  = require('path');
const moment = require('moment-timezone');
const router = express.Router();

const getpage = (req, res, next) => {
  let libTypes = new Set();
  libTypes.add('all');
  const type = res.locals.type;
  let activeType = null;
  if (req.query.type) {
    const libtype = req.query.type.trim().toLowerCase();
    if (libtype !== 'all')
      activeType = libtype;
  }
  let files = fs.readdirSync('public/reports')
    .filter(filename => {
      let parsed = filename.split(/[-.]+/);
      if (type !== 'Home')
        return parsed[4] == 'txt' && parsed[1] == type;
      return parsed[4] == 'txt';
    })
    .sort().reverse()
    .map(filename => {
      let parsed = filename.split(/[-.]+/);
      libTypes.add(parsed[2]);
      return {
        name: `${parsed[1]} ${parsed[2]} report`,
        datetime: moment(parsed[0], 'x').format('lll'),
        status: parsed[3],
        filename: filename,
        type: parsed[2].toLowerCase()
      }
    })
    .filter(file => activeType ? file.type === activeType : true);
  libTypes = Array.from(libTypes).sort();
  res.render('index', {
    title: 'ID TECH C++ SDK Report',
    files,
    active: type,
    libTypes,
    activeType
  });
}

router.get('/', function(req, res, next) {
  res.locals.type = 'Home'
  next();
}, getpage);

router.get('/mac', function(req, res, next) {
  res.locals.type = 'Mac'
  next();
}, getpage);

router.get('/x86_64', function(req, res, next) {
  res.locals.type = 'x86_64'
  next();
}, getpage);

router.get('/windows', function(req, res, next) {
  res.locals.type = 'Windows'
  next();
}, getpage);

router.get('/pisces', function(req, res, next) {
  res.locals.type = 'Pisces'
  next();
}, getpage);

router.get('/arm', function(req, res, next) {
  res.locals.type = 'ARM'
  next();
}, getpage);

module.exports = router;
