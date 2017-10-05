// express
const express = require('express');
const app = express();
const router = express.Router();

// body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// import model contact
const Contact = require('../models/contacts');

// import model address
const Address = require('../models/addresses');

router.get('/contacts', function(req, res){
  Contact.getAllContacts().then((contacts) => {
    res.render('contacts/index', {contacts: contacts});
  });
});

router.get('/contacts/edit/:id', function(req, res){
  Contact.getByIDContact(req.params.id).then((contact) => {
    res.render('contacts/edit', {contacts: contact});  
  });
});

router.post('/contacts', function(req, res){
  Contact.insertContact(req.body.name, req.body.company, req.body.telp_number, req.body.email).then(() => {
    res.redirect('/contacts');
  });
});

router.post('/contacts/edit/:id', function(req, res){
  Contact.updateContact(req.body.name, req.body.company, req.body.telp_number, req.body.email, req.params.id).then(() => {
    res.redirect('/contacts');
  });
});

router.get('/contacts/delete/:id', function(req, res){
  Contact.deleteContact(req.params.id).then(() => {
    res.redirect('/contacts');
  });
});

router.get('/contacts/addresses/:id', function(req, res){
  Promise.all([
    Address.getAddressByIDContact(req.params.id),
    Contact.getByIDContact(req.params.id)
    ]).then((rows) => {
      res.render('contacts/addresses', {addresses: rows[0], contacts: rows[1]});
    });
});

module.exports = router;