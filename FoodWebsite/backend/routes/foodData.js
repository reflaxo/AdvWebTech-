var express = require('express');
var router = express.Router();
var foodControl = require('../controllers/foodController');


 router.post('/addRecipe', foodControl.addRecipe);
 router.post('/updateRecipe/:id', foodControl.updateRecipe );
 router.post('/deleteRecipe/:id', foodControl.deleteRecipe);
 router.get('/getRecipes/:country', foodControl.showRecipes);
 router.get('/detailRecipe/:id', foodControl.showRecipe);
 //router.post('/deleteAll', foodControl.deleteAllRecipes);

module.exports = router;
