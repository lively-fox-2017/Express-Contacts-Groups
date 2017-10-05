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
  Promise.all([
    Address.getAllAddresss(),
    Contact.getAllContacts()
    ]).then((rows) => {
      rows[0].forEach((addresses) => {
        rows[1].forEach((contacts) => {
          if (addresses.id_contacts == contacts.id) {
            addresses.name = contacts.name;
          };
        });
      });
      res.render('addresses/index', {addresses: rows[0], contacts: rows[1]});
    });
});

router.get('/addresses/edit/:id', function(req, res){
  Promise.all([
    Address.getByIDAddress(req.params.id),
    Contact.getAllContacts()
    ]).then((rows) => {
      res.render('addresses/edit', {addresses: rows[0], contacts: rows[1]});
    });
});

router.post('/addresses', function(req, res){
  Address.insertAddress(req.body.street, req.body.city, req.body.zipcode, req.body.id_contacts).then((rows) => {
    res.redirect('/addresses');
  });
});

router.post('/addresses/edit/:id', function(req, res){
  Address.updateAddress(req.body.street, req.body.city, req.body.zipcode, req.body.id_contacts, req.params.id).then((rows) => {
    console.log('street > ' + req.body.street, ' city > ' + req.body.city, ' zipcode > ' +  req.body.zipcode, ' id_contacts > ' +  req.body.id_contacts, ' reqParams > ' +  req.params.id)
    res.redirect('/addresses');
  });
});

router.get('/addresses/delete/:id', function(req, res){
  Address.deleteAddress(req.params.id).then((rows) => {
    res.redirect('/addresses');
  });
});

module.exports = router;