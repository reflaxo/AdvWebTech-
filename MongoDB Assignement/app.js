const express = require('express');
const app = express();
const port = 3000;

const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
var ObjectId = require('mongodb').ObjectID;

app.get('/', (req, res) => res.send('Welcome to AdvWebTech Course'));

app.get('/Create', (req, res) => {
	mongo.connect(url, { useNewUrlParser: true }, (err, client) => {
		if (err) {console.error(err); res.send(err);}
	  
		const db = client.db('advwebtech');
		const Scollection = db.collection('students');
		const Ccollection = db.collection('courses');

 //comment
		 var SampleStudent1 = 
		 { _id: "67385700", FirstName: "Michael", 
		 LastName: "Chang", Age:"23", StudyProgram:"ISE",
		 Courses: [{courses_id: "Neuro"}] }

		  var SampleStudent2 = 
		 { _id: "93385780", FirstName: "John", 
		 LastName: "Green", Age:"46", StudyProgram:"AI",
		 Courses: [{courses_id: "Neuro"}] }


		var SampleCourse = { 
		LongName: "Neuroscience", 
		_id:"Neuro", 
		Professor:"Prof. Pauli",
		Type: "Lecture",
		Credits:"6",
		Language:"English",
		RegisteredStudents: [{students_id: "67385700"}]
		 };

		Scollection.insertMany([ SampleStudent1, SampleStudent2 ], (errInsert, result) => {
			client.close();
			res.send(req.params.name);
		});

		Ccollection.insertOne(SampleCourse, (errInsert, result) => {
			client.close();
			res.send(req.params.name);
		});
	});	
});



app.get('/Read', (req, res) => {

	//Doesn't order yet, doesn't connect the collection to the student

	mongo.connect(url, { useNewUrlParser: true }, (err, client) => {
		if (err) {console.error(err); res.send(err);}
	  
		const db = client.db('advwebtech');
		const Scollection = db.collection('students');
		const Ccollection = db.collection('courses');
		var items="";


		Scollection.find().sort({FirstName:1}).toArray((err, items) => {
			client.close();
			
		});


		Ccollection.find().sort({ShortName:1}).toArray((err, items) => {

			
			res.send(items);
			client.close();
			
		});

	});
});


app.get('/Register', (req, res) => {

	//Update function probably

});



app.get('/Deregister', (req, res) => {

	//Currently deletes all not one
	mongo.connect(url, { useNewUrlParser: true }, (err, client) => {
		if (err) {console.error(err); res.send(err);}
	  
		const db = client.db('advwebtech');
		const Scollection = db.collection('students');
		const Ccollection = db.collection('courses');
		collection.deleteMany({});
		client.close();
		res.send('All names removed');
	});
});


//Example using mongoose
const mongoose = require('mongoose');
var mongoURL = 'mongodb://localhost:27017/advwebtech';
mongoose.Promise = global.Promise;
mongoose.connect(mongoURL, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Product = require('./models/product.model');

app.get('/createproduct/:name/:price', (req, res) => {
	var product = new Product({
			name: req.params.name,
			price: req.params.price
	});
	
	product.save(function (err) {
		if (err) {
			return next(err);
		}
		res.send('Product Created successfully')
	});
});

app.get('/readproducts', (req, res) => {
	Product.find({}, function(err, items) {
	   res.send(items);
	});
});

//


app.listen(port, () => console.log('Server started on port 3000'));