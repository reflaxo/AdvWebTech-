//Import the Task's model
var multer = require("multer");
//Task 3.1 -  connect the model to the controller
var Food = require("../models/foodModel");
const path = require("path");
var mongoose = require("mongoose");
var Food = mongoose.model("Food");
//const upload = multer({ storage: storage });
fs = require("fs");

//Fileupload
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb) {
    cb(null, req.body.name + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }
}).single("myImage");

exports.addRecipe = function(req, res) {
  upload(req, res, err => {
    if (req.file.path) {
      var img = fs.readFileSync(req.file.path);
      var encode_image = img.toString("base64");
    } else {
      var encode_image = "";
    }

    console.log("Request ---", req.body);
    console.log("Request file ---", req.file); 

    var newFoodEntry = {
      name: req.body.name,
      image: {
        contentType: req.file.mimetype,
        data: new Buffer(encode_image, "base64")
      },
      question: "Where is this food from?",
      country: req.body.country,
      ingridients: req.body.ingridients,
      foodType: req.body.foodType,
      recipe: req.body.recipe
    };

    var food = new Food(newFoodEntry);
    food.save(function(error) {
      if (error) {
        console.log("There was an error server side" + error);
        throw error;
      }
    });
  });
};

exports.showRecipes = function(req, res, next) {
  Food.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ recipes: data });
  });
};

// this is our delete method
// this method removes existing data in our database
exports.deleteAllRecipes = function(req, res, next) {
  Food.remove({}, function(err) {
    if (err) {
      console.log(err);
    } else {
      res.end("success");
    }
  });
};

exports.deleteOneRecipe = function(req, res, next) {
  const { id } = req.body;
  Food.findOneAndDelete(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
};

exports.updateRecipe = function(req, res) {
  Food.findById(req.params.id, function(err, food) {
    if (!food) res.status(404).send("data is not found");
    else food.question = "Where is this food from?";
    food.answers = req.body.answers;
    food.recipe = req.body.recipe;
    food.image = req.body.image;
    food
      .save()
      .then(food => {
        res.json("food updated!");
      })
      .catch(err => {
        res.status(400).send("Update not possible");
      });
  });
};

