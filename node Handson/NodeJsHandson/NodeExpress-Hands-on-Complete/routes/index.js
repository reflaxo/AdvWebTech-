var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

});

/* Task 1.1 Render Index with another path and title*/
router.get('/alternative', function(req, res, next) {
  res.render('index', { title: 'Alternative' });
});


module.exports = router;
