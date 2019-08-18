var Contact = require("../models/contactFormModel");

exports.addContact = function(req, res) {
  console.log("Request ---", req.body);
  console.log("Request file ---", req.file);

  //Creates all the Data
  var newContactEntry = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    eMail: req.body.eMail,
    subject: req.body.subject
  };

  var contact = new Contact(newContactEntry);

  contactCollection.insert(contact, (error, result) => {
    if (error) {
      return response.status(500).send(error);
    }
    res.send(result.result);
  });
};
