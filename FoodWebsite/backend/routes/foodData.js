var express = require('express');
var router = express.Router();
var foodControl = require('../controllers/foodController');


 router.post('/addRecipe', foodControl.addRecipe);
 router.get('/addRecipe', foodControl.addRecipe);
 router.post('/update/:id', foodControl.updateRecipe);
 router.get('/getRecipes', foodControl.showRecipes);
 router.get('/getOneRecipe', foodControl.showRecipe);
 router.post('/deleteAll', foodControl.deleteAllRecipes);
 router.post('/deleteOneRecipe', foodControl.deleteOneRecipe);



module.exports = router;
