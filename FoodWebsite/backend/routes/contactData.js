var express = require('express');
var router = express.Router();
var contactController = require('../controllers/contactController');


router.post('/addFormData', contactController.addContact);

module.exports = router;