const express = require('express');
const router = express.Router();
const Contact = require('../models/contact.js');
const Profile = require('../models/profile.js');

router.get('/', function(req, res) {
  Profile.findAll(function(err, rows) {
    rows.forEach((row, index) =>{
      Contact.findById(row.Contact_ID, function(err3, rows3) {
        if(rows3 !== undefined)
          row['name'] = rows3.name;
        if (index >= rows.length - 1) {
          Contact.findAll(function(err2, rows2) {
            res.render('profiles', {
              dataRows: rows,
              contactsRows: rows2,
              message: ""+req.query.message
            });
          })
        }
      })
    })
  })
})

router.post('/', function(req, res) {
  Profile.insertData(req.body, function(err){
    res.redirect('profiles?message='+err);
  })
})

router.get('/edit/:id', function(req, res) {
  Profile.findById(req.param('id'), function(err, rows){
    Contact.findAll(function(err2, rows2){
      res.render('profiles_edit', {dataRows:rows, contactsRows:rows2});
    })
  })
})

router.post('/edit/:id', function(req, res) {
  req.body.id = req.param('id');
  Profile.editData(req.body, function(err){
    res.redirect('../../profiles?message='+err);
  })
})

router.get('/delete/:id', function(req, res) {
  Profile.deleteData(req.param('id'), function(err){
    res.redirect('../../profiles?message='+err);
  })
})

module.exports = router;
