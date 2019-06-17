var express = require('express');
var router = express.Router();
var foodControl = require('../controllers/foodController');

//Route to upload pictures
 router.post('/addRecipe', foodControl.addRecipe);
 router.get('/addRecipe', foodControl.addRecipe);
 router.post('/update/:id', foodControl.updateRecipe);
 //Route to Show pictures
 router.get('/getRecipes', foodControl.showRecipes);
  //Test
 router.get('/text',function(req, res, next) {
res.send('API is working properly');});


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
