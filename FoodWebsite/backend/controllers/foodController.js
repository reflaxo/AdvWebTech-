//Import the Task's model
var multer = require("multer");
//Task 3.1 -  connect the model to the controller
const Food = require("../models/foodModel");
const path = require("path");
var mongoose = require("mongoose");
//const Food = mongoose.model("Food");
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

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

exports.addRecipe = function(req, res) {
   

    //Transforms the Image to Base64
    upload(req, res, err => {
      if (req.file) {
        var img = fs.readFileSync(req.file.path);
        var encode_image = img.toString("base64");
        var mimetype = req.file.mimetype;
      } else {
        var encode_image = "";
        var mimetype = "";
      }
  
      //Logs Data
      console.log("Request ---", req.body);
      console.log("Request file ---", req.file); 
  
      //Creates all the Data
      var newFoodEntry = {
        name: req.body.name,
        image: {
          contentType: mimetype,
          data: new Buffer(encode_image, "base64")
        },
        country: req.body.country,
        ingridients: req.body.ingridients,
        foodType: req.body.foodType,
        recipe: req.body.recipe
      };
  
      var food = new Food(newFoodEntry);
  
        foodCollection.insert(food, (error, result) => {
          if(error) {
              return response.status(500).send(error);
          }
          res.send(result.result);
      });
  
  
    });
  };

//Shows Recipe for Quiz and Country
exports.showRecipes = function(req, res) {
  const c = req.params.country;
  if(c != null){
      console.log(c);
 
  foodCollection.find({"country": c}).toArray(function(err, data) {
    if(err) {
        console.error(JSON.stringify(err));
        res.status(404).send("data is not found");
    } 
   return res.json(data);
});
}
else{
  foodCollection.find({ }).toArray(function(err, data) {
    if(err) {
        console.error(JSON.stringify(err));
        res.status(404).send("data is not found");
    } 
   return res.json(data);

  })
}
};


//Shows Single Recipe
exports.showRecipe = function(req, res, next) {
  console.log(req);
  var token = getToken(req.headers);
  if (token) {
    const id = mongoose.Types.ObjectId(req.params.id);
   
      foodCollection.findOne({_id: id}, function(err, data){
        if (err){
            console.log("errr",err);
            if (!data){res.status(404).send("data is not found" + id);}
        }else{
            console.log("found" + data);
            res.json(data);
        }

});
  };
};

// this is our delete method
// this method removes existing data in our database
exports.deleteAllRecipes = function(req, res, next) {
    foodCollection.remove({}, function(err) {
    if (err) {
      console.log(err);
    } else {
      res.end("success");
    }
  });
};

exports.deleteRecipe = function(req, res, next) {

    const id = mongoose.Types.ObjectId(req.body.params.id);


    foodCollection.deleteOne({_id: id}, err => {
    if (err) return res.send(err);
    return res.send("success");
  });
};

exports.updateRecipe = function(req, res) {
    foodCollection.findById(req.params.id, function(err, food) {
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

