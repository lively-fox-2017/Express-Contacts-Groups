// express
const express = require('express');
const app = express();
const router = express.Router();

// sqlite3
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');

// body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const Contact = require('../models/contacts');
router.get('/contacts', function(req, res){
  Contact.getAll((err, result) => {
  	if(err){
	  console.log('error to add data');
	}
  res.render('contacts/index', {contacts: result});	
  });
});

router.post('/contacts', function(req, res){
  Contact.create(req.body.name, req.body.company, req.body.telp_number, req.body.email);
  res.redirect('/contacts');
});

router.get('/contacts/edit/:id', function(req, res){
  Contact.getByID(req.params.id, (rows) => {
	res.render('contacts/edit', {contacts: rows});
  });
});

router.post('/contacts/edit/:id', function(req, res){
  Contact.update(req.body.name, req.body.company, req.body.telp_number, req.body.email, req.params.id);
  res.redirect('/contacts');
});

router.get('/contacts/delete/:id', function(req, res){
  Contact.delete(req.params.id);
  res.redirect('/contacts');
});

router.get('/contacts/addresses/:id', function(req, res){
  Contact.getaddresses(req.params.id, (rows1, rows2) => {
	res.render('contacts/addresses', {addresses: rows1, contacts: rows2});
  });
});

module.exports = router;