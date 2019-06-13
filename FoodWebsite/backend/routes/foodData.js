/* 1.2 - Create a New Path document*/
var express = require('express');
var router = express.Router();
var multer = require('multer');
/*Task 3.1 -  require the controller to connect it to the root file*/
var foodControl = require('../controllers/foodController');
/// Task ROUTES ///
/* Task 1.2 - Render the Index File. 
router.get('/', function(req, res, next) {
  res.json({"foo": "bar"});
  });
  

  
  */

 router.post('/upload', foodControl.uploadPics);
 router.get('/', foodControl.showPics);
 router.get('/text',function(req, res, next) {
  res.send('API is working properly');});


/** Upload file to path and add record to database */


/*Task 3.2 - Create the routes to the functions you find in the controller*/

// GET request for creating a task. NOTE This must come before route for id (i.e. display tasks).
router.get('/create', foodControl.foodCreateGet);

// POST request for creating Task.
router.post('/create', foodControl.foodCreatePost);

// GET request to delete task.
router.get('/:id/delete', foodControl.foodDeleteGet);

// POST request to delete task
router.post('/:id/delete', foodControl.foodDeletePost);

//========= Task 3.5 End ======================

// GET request for list of all tasks.
router.get('/taskList', foodControl.foodList);

module.exports = router;
