// express
const express = require('express');
const app = express();
const router = express.Router();

// body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// import model contact
const Address = require('../models/addresses');

// import model contact
const Contact = require('../models/contacts');

router.get('/addresses', function(req, res){
  Address.getAllAddresss(function(addresses){
    Contact.getAllContacts(function(contacts){
      res.render('addresses/index', {addresses: addresses, contacts: contacts});
    });
  });
});

router.get('/addresses/edit/:id', function(req, res){
  Address.getByIDAddress(req.params.id, function(address){
    Contact.getAllContacts(function(contacts){
      res.render('addresses/edit', {addresses: address, contacts: contacts});
    });
  });
});

router.post('/addresses', function(req, res){
  Address.insertAddress(req.body.street, req.body.city, req.body.zipcode, req.body.id_contacts, function(){
    res.redirect('/addresses');
  });
});

router.post('/addresses/edit/:id', function(req, res){
  Address.updateAddress(req.body.street, req.body.city, req.body.zipcode, req.body.id_contacts, req.params.id, function(){
    res.redirect('/addresses');
  });
});

router.get('/addresses/delete/:id', function(req, res){
  Address.deleteAddress(req.params.id, function(){
    res.redirect('/addresses');
  })
});

module.exports = router;