var express = require('express');
var router = express.Router();
var contactControl = require('../controllers/contactFormController');
const passport = require('../config/passport');



router.post('/new',  contactControl.addContact);


module.exports = router;
