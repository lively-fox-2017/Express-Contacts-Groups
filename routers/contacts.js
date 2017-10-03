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

router.get('/contacts', function(req, res){
  Contact.getAllContacts(function(contacts){
  res.render('contacts/index', {contacts: contacts});
  });
});

router.get('/contacts/edit/:id', function(req, res){
  Contact.getByIDContact(req.params.id, function(contact){
	res.render('contacts/edit', {contacts: contact});
  });
});

router.post('/contacts', function(req, res){
  Contact.insertContact(req.body.name, req.body.company, req.body.telp_number, req.body.email, function(){
  	res.redirect('/contacts');
  });
});

router.post('/contacts/edit/:id', function(req, res){
  Contact.updateContact(req.body.name, req.body.company, req.body.telp_number, req.body.email, req.params.id, function(){
  	res.redirect('/contacts');
  });
});

router.get('/contacts/delete/:id', function(req, res){
  Contact.deleteContact(req.params.id, function(){
  	res.redirect('/contacts');
  });
});

router.get('/contacts/addresses/:id', function(req, res){
  Contact.getaddresses(req.params.id, (rows1, rows2) => {
	res.render('contacts/addresses', {addresses: rows1, contacts: rows2});
  });
});

module.exports = router;