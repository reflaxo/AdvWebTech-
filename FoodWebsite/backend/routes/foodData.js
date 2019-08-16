var express = require('express');
var router = express.Router();
var foodControl = require('../controllers/foodController');
var passport = require('passport');
require('../config/passport')(passport);



 router.post('/addRecipe',  foodControl.addRecipe);
 router.post('/updateRecipe/:id', passport.authenticate('jwt', { session: false}),foodControl.updateRecipe );
 router.post('/deleteRecipe/:id', passport.authenticate('jwt', { session: false}), foodControl.deleteRecipe);
 router.get('/getRecipes/:country', foodControl.showRecipes);
 router.get('/getAllRecipes/', foodControl.showRecipes);
 router.get('/detailRecipe/:id', passport.authenticate('jwt', { session: false}), foodControl.showRecipe);
 //router.post('/deleteAll', foodControl.deleteAllRecipes);

module.exports = router;
