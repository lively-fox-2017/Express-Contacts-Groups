const express = require('express');
const router = express.Router();
const Contact = require('../models/contact.js');
const Adresses = require('../models/adress.js');

router.get('/', function(req, res) {
  Adresses.findAll(function(err, rows) {
    rows.forEach((adress, index) => {
      Contact.findById(adress.Contact_ID, function(err3, rows3) {
        if (rows3 !== undefined){
          adress['name'] = rows3.name;
        }

        if (index >= rows.length - 1) {
          Contact.findAll(function(err2, rows2) {
            res.render('adresses', {
              dataRows: rows,
              contactsRows: rows2,
              message:""+req.query.message
            });
          })
        }
      })
    })
  })
})

router.post('/', function(req, res) {
  Adresses.insertData(req.body, function(err){
    res.redirect('adresses?message='+err);
  });
});

router.get('/delete/:id', function(req, res){
  Adresses.deleteData(req.param('id'), function(err){
    res.redirect('../../adresses?message='+err);
  })
})

router.get('/edit/:id', function(req, res){
  Adresses.findById(req.param('id'), function(err, rows){
    Contact.findAll(function(err2, rows2){
      res.render('adresses_edit', {dataRows: rows, contactsRows:rows2});
    })
  })
})

router.post('/edit/:id', function(req, res){
  req.body.id = req.param('id');
  Adresses.editData(req.body, function(err){
    res.redirect('../../adresses?message='+err);
  });
})

module.exports = router;
