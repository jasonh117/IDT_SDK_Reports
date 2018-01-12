var express = require('express');
var fs = require('fs');
var path  = require('path');
var moment = require('moment-timezone');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var files = fs.readdirSync('public/reports')
    .filter(filename => path.extname(filename) == '.txt')
    .sort().reverse()
    .map(filename => {
      var parsed = filename.split(/[-.]+/);
      return {
        name: `${parsed[1]} ${parsed[2]}`,
        datetime: moment(parsed[0], 'x').format('lll'),
        status: parsed[3],
        filename: filename
      }
    });
  res.render('index', { title: 'C++ SDK Report', files, active: 'home' });
});

router.get('/Mac', function(req, res, next) {
  var files = fs.readdirSync('public/reports')
    .filter(filename => {
      var parsed = filename.split(/[-.]+/);
      return parsed[4] == 'txt' && parsed[1] == 'Mac';
    })
    .sort().reverse()
    .map(filename => {
      var parsed = filename.split(/[-.]+/);
      return {
        name: `${parsed[1]} ${parsed[2]}`,
        datetime: moment(parsed[0], 'x').format('lll'),
        status: parsed[3],
        filename: filename
      }
    });
  res.render('index', { title: 'C++ SDK Report Mac', files, active: 'mac' });
});

router.get('/x86_64', function(req, res, next) {
  var files = fs.readdirSync('public/reports')
    .filter(filename => {
      var parsed = filename.split(/[-.]+/);
      return parsed[4] == 'txt' && parsed[1] == 'x86_64';
    })
    .sort().reverse()
    .map(filename => {
      var parsed = filename.split(/[-.]+/);
      return {
        name: `${parsed[1]} ${parsed[2]}`,
        datetime: moment(parsed[0], 'x').format('lll'),
        status: parsed[3],
        filename: filename
      }
    });
  res.render('index', { title: 'C++ SDK Report x86_64', files, active: 'x86_64' });
});

router.get('/windows', function(req, res, next) {
  var files = fs.readdirSync('public/reports')
    .filter(filename => {
      var parsed = filename.split(/[-.]+/);
      return parsed[4] == 'txt' && parsed[1] == 'Windows';
    })
    .sort().reverse()
    .map(filename => {
      var parsed = filename.split(/[-.]+/);
      return {
        name: `${parsed[1]} ${parsed[2]}`,
        datetime: moment(parsed[0], 'x').format('lll'),
        status: parsed[3],
        filename: filename
      }
    });
  res.render('index', { title: 'C++ SDK Report Windows', files, active: 'windows' });
});

router.get('/pisces', function(req, res, next) {
  var files = fs.readdirSync('public/reports')
    .filter(filename => {
      var parsed = filename.split(/[-.]+/);
      return parsed[4] == 'txt' && parsed[1] == 'Pisces';
    })
    .sort().reverse()
    .map(filename => {
      var parsed = filename.split(/[-.]+/);
      return {
        name: `${parsed[1]} ${parsed[2]}`,
        datetime: moment(parsed[0], 'x').format('lll'),
        status: parsed[3],
        filename: filename
      }
    });
  res.render('index', { title: 'C++ SDK Report Pisces', files, active: 'pisces' });
});

router.get('/arm', function(req, res, next) {
  var files = fs.readdirSync('public/reports')
    .filter(filename => {
      var parsed = filename.split(/[-.]+/);
      return parsed[4] == 'txt' && parsed[1] == 'ARM';
    })
    .sort().reverse()
    .map(filename => {
      var parsed = filename.split(/[-.]+/);
      return {
        name: `${parsed[1]} ${parsed[2]}`,
        datetime: moment(parsed[0], 'x').format('lll'),
        status: parsed[3],
        filename: filename
      }
    });
  res.render('index', { title: 'C++ SDK Report ARM', files, active: 'arm' });
});

module.exports = router;
