//Import the Task's model

//Task 2.4 connect the model to the controller
var Task = require('../models/task')


// Display Task create form on GET.
exports.task_create_get = function(req, res) {
    // Task 3.2 Render the Task form in the controller
    res.render('task_form', { title: 'Create Task' });
};

// Display list of all Task.
exports.task_list = function (req, res, next) {

    Task.find()
        .exec(function (err, list_tasks) {
            if (err) { return next(err); }
            // Successful, so render.
            res.render('task_list', { title: 'Task List', task_list: list_tasks });
        })
};

// Handle Task create on POST.
exports.task_create_post = function(req, res, next) {
    var task = new Task(
        {
                taskName: req.body.taskName,
                workEffort: req.body.workEffort,
                deadline: req.body.deadline,
        });
		
		//saving the Data in Database		
		task.save(function (err) {
        if (err) { return next(err); }
		
        // Successful - redirect to new task record.
        res.redirect('/tasks');
    });
};

// Display task delete form on GET.
exports.task_delete_get = function(req, res, next) {
    Task.findById(req.params.id)
        .exec(function (err, task) {
            if (err) { return next(err); }
            if (task == null) { // No results.
                res.redirect('/tasks');
            }
            // Successful, so render.
            res.render('task_delete', { title: 'Delete Task', task: task });
        })
};

// Handle Task delete on POST.
exports.task_delete_post = function(req, res, next) {

    Task.findByIdAndRemove(req.body.taskid,function (err) {
        if (err) { return next(err); }
        // Successful - redirect to new task record.
        res.redirect('/tasks');
    })
};
