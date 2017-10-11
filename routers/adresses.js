const express = require('express');
const router = express.Router();
const Contact = require('../models/contact.js');
const Adresses = require('../models/adress.js');

router.get('/', function(req, res) {
  var adressRows = null;
  Adresses.findAll().then((rows) => {
    rows.forEach((adress, index) => {
      Contact.findById(adress.Contact_ID).then((rows3) => {
        if (rows3 !== undefined) {
          adress['name'] = rows3.name;
        }
      })
    })
    adressRows = rows;
    return Contact.findAll();
  }).then((contactRows) => {
    res.render('adresses', {
      dataRows: adressRows,
      contactsRows: contactRows,
      message: "" + req.query.message
    });
  }).catch((err)=>{
    console.log(err);
  })
})

router.post('/', function(req, res) {
  Adresses.insertData(req.body).then(() => {
    res.redirect('adresses?message=null');
  }).catch((err) => {
    res.redirect('adresses?message=' + err);
  })
});

router.get('/delete/:id', function(req, res) {
  Adresses.deleteData(req.param('id')).then(() => {
    res.redirect('../../adresses?message=null');
  }).catch((err) => {
    res.redirect('../../adresses?message=' + err);
  })
})

router.get('/edit/:id', function(req, res) {
  Promise.all([
    Adresses.findById(req.param('id')),
    Contact.findAll()
  ]).then((results) => {
    res.render('adresses_edit', {
      dataRows: results[0],
      contactsRows: results[1]
    });
  }).catch((err) => {
    console.log(err);
  })
})

router.post('/edit/:id', function(req, res) {
  req.body.id = req.param('id');
  Adresses.editData(req.body).then(() => {
    res.redirect('../../adresses?message=null');
  }).catch((err) => {
    res.redirect('../../adresses?message=' + err);
  })
})

module.exports = router;
