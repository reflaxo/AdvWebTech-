var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Adapt view */
router.get('/alternative', function(req, res, next) {
  res.render('index', { title: 'Alternative' });
});

module.exports = router;
