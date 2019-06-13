//Import the Task's model
var multer = require('multer');
//Task 3.1 -  connect the model to the controller
var Food = require('../models/foodModel');
var upload    = require('./upload');
var mongoose  = require('mongoose');
var Photo     = mongoose.model('Photos');



//Task 1.5 - write a controller for our "cool" Code
exports.simple_task = function(req, res) {
    res.render('simple_task', { task: 'Washing dishes', effort:"30 minutes", deadline:"today"});

};

// Display list of all Task.
exports.foodList = function (req, res, next) {
// Task 3.2 Render the Task form in the controller
    Food.find()
        .exec(function (err, list_tasks) {
            if (err) { return next(err); }
            // Successful, so render.
            res.render('task_list', { title: 'Task List', task_list: list_tasks });
        })
};

exports.uploadPics = function(req, res) {

    upload(req, res,(error) => {
        if(error){
           res.redirect('/?msg=3');
        }else{
          if(req.file == undefined){
            
            res.redirect('/?msg=2');
  
          }else{
               
              /**
               * Create new record in mongoDB
               */
              var fullPath = "files/"+req.file.filename;

              var document = {
                path:     fullPath, 
                caption:   req.body.caption,
                question: req.body.question,
                answers: [{
                    rightwrong: req.body.type1,
                    content: req.body.content1,
                 }, {
                    rightwrong: req.body.type2,
                    content: req.body.content2,
                 },
                 {
                    rightwrong: req.body.type3,
                    content: req.body.content3
                 }],
                recipe: req.body.recipe
              };
    
            var photo = new Photo(document); 
            photo.save(function(error){
              if(error){ 
                console.log(error);
                throw error;
               
              } 
              res.redirect('/?msg=1');
           });
        }
      }
      });};
 

exports.showPics = function(req, res, next) {

        Photo.find({}, ['path','caption', 'question'], {sort:{ _id: -1} }, function(err, photos) {
          res.render('index', { title: 'NodeJS file upload tutorial', msg:req.query.msg, photolist : photos });
          
        });


    /*
    Image.findOne({_id: req.params.id}, (err, image) => {
      if (err) return res.sendStatus(404);
      fs.createReadStream(path.resolve(UPLOAD_PATH, image.filename)).pipe(res)});*/
    };

exports.insertImage = '/api/photo', function(req,res){
    var newItem = new Item();
    newItem.img.data = fs.readFileSync(req.files.userPhoto.path);
    newItem.img.contentType = 'image/png';
    newItem.save();}

// Handle Task create form on GET.
exports.foodCreateGet = function(req, res) {
    res.send("hi here you can create new recipes");
};


// Handle Task create on POST.
exports.foodCreatePost = function(req, res, next) {
    var food = new Food(
        {
                

                question: req.body.question,
                image: req.body.image,
                answers: req.body.answers,
                recipe: req.body.recipe
        });
		
		//saving the Data in Database		
		task.save(function (err) {
        if (err) { return next(err); }
		
        // Successful - redirect to new task record.
        res.redirect('/food/recipes');
    });
};

// Display task delete form on GET.
exports.foodDeleteGet = function(req, res, next) {
    Food.findById(req.params.id)
        .exec(function (err, task) {
            if (err) { return next(err); }
            if (food == null) { // No results.
                res.redirect('/food/recipes');
            }
            // Successful, so render.
            res.render('foodDelete', { title: 'Delete Recipe', task: task });
        })
};

// Handle Task delete on POST.
exports.foodDeletePost = function(req, res, next) {

    Task.findByIdAndRemove(req.body.taskid,function (err) {
        if (err) { return next(err); }
        // Successful - redirect to new task record.
        res.redirect('/food');
    })
};
