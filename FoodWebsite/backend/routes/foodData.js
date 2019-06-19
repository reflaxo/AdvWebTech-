var express = require('express');
var router = express.Router();
var foodControl = require('../controllers/foodController');

//Route to upload pictures
 router.post('/addRecipe', foodControl.addRecipe);
 router.get('/addRecipe', foodControl.addRecipe);
 router.post('/update/:id', foodControl.updateRecipe);
 //Route to Show pictures
 router.get('/getRecipes', foodControl.showRecipes);
 router.post('/deleteAll', foodControl.deleteAllRecipes);
  //Test
// GET request for creating a task. NOTE This must come before route for id (i.e. display tasks).
router.get('/create', foodControl.foodCreateGet);


module.exports = router;
