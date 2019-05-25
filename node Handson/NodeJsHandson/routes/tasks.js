/* 1.2 Create a New Path document*/
var express = require('express');
var router = express.Router();
var mongo = require('mongodb');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('this is the view for path 1.2');
  });
  
/* Task 1.3 Render another view */
router.get('/cool', function(req, res, next) {
    res.render('cool',  { name: 'Cara' , country: 'Germany', show:'Bojack Horseman'});
  });

  module.exports = router;
  