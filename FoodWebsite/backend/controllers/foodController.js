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

//Task 1.5 - write a controller for our "cool" Code
exports.simple_task = function(req, res) {
  res.render("simple_task", {
    task: "Washing dishes",
    effort: "30 minutes",
    deadline: "today"
  });
};



exports.addRecipe = function(req, res) {

  upload(req, res, err => {
    var img = fs.readFileSync(req.file.path);
    var encode_image = img.toString('base64');
  
    console.log("Request ---", req.body);
    console.log("Request file ---", req.file); //Here you get file.
    /*Now do where ever you want to do*/

    var newFoodEntry = {
      name: req.body.name,
      image: {contentType: req.file.mimetype, data:  new Buffer(encode_image, 'base64')},
      question: "Where is this food from?",
      country: req.body.country,
      foodType: req.body.foodType,
      recipe: req.body.recipe
    };

    //newFoodEntry.image.contentType='image/png';
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

  //fs.writeFile('./output.png', recipes.image)
};

exports.deleteAllRecipes = function(req, res, next) {
  Food.remove({}, function(err) {
    if (err) {
      console.log(err);
    } else {
      res.end("success");
    }
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

// Handle Task create form on GET.
exports.foodCreateGet = function(req, res) {
  res.send("hi here you can create new recipes");
};

// Handle Task create on POST.
exports.foodCreatePost = function(req, res, next) {
  var food = new Food({
    question: req.body.question,
    image: req.body.image,
    answers: req.body.answers,
    recipe: req.body.recipe
  });

  //saving the Data in Database
  task.save(function(err) {
    if (err) {
      return next(err);
    }

    // Successful - redirect to new task record.
    res.redirect("/food/recipes");
  });
};

// Display task delete form on GET.
exports.foodDeleteGet = function(req, res, next) {
  Food.findById(req.params.id).exec(function(err, task) {
    if (err) {
      return next(err);
    }
    if (food == null) {
      // No results.
      res.redirect("/food/recipes");
    }
    // Successful, so render.
    res.render("foodDelete", { title: "Delete Recipe", task: task });
  });
};

/* Handle Task delete on POST.
exports.foodDeletePost = function(req, res, next) {

    Task.findByIdAndRemove(req.body.taskid,function (err) {
        if (err) { return next(err); }
        // Successful - redirect to new task record.
        res.redirect('/food');
    });
};*/
