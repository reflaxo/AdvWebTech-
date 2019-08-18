var express = require('express');
var router = express.Router();
var contactControl = require('../controllers/contactFormController');
var passport = require('passport');
require('../config/passport')(passport);


router.post('/new',  contactControl.addContact);


module.exports = router;
