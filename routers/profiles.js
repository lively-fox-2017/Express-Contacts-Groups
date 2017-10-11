const express = require('express');
const router = express.Router();
const Contact = require('../models/contact.js');
const Profile = require('../models/profile.js');

router.get('/', function(req, res) {
  function findContact(row) {
    var promise = new Promise((resolve, reject) => {
      Contact.findById(row.Contact_ID).then((rows3) => {
        if (rows3 !== undefined)
          row['name'] = rows3.name;
        resolve(row);
      }).catch((err) => {
        reject(err);
        console.log(err);
      })
    })
    return promise;
  }
  Profile.findAll().then((rows) => {
    var arr_prom = [Contact.findAll()];
    rows.forEach((row, index) => {
      arr_prom.push(findContact(row))
    })
    Promise.all(arr_prom).then((results) => {
      contactRows = results[0];
      results.shift();
      res.render('profiles', {
        dataRows: results,
        contactsRows: contactRows,
        message: "" + req.query.message
      });
    }).catch((err)=>{
      console.log(err);
    })
  }).catch((err)=>{
    console.log(err);
  })
})

router.post('/', function(req, res) {
  Profile.insertData(req.body).then((lastID) => {
    res.redirect('profiles?message=null');
  }).catch((err) => {
    res.redirect('profiles?message=' + err);
  })
})

router.get('/edit/:id', function(req, res) {
  Promise.all([
    Profile.findById(req.param('id')),
    Contact.findAll()
  ]).then((results) => {
    res.render('profiles_edit', {
      dataRows: results[0],
      contactsRows: results[1]
    });
  }).catch((err) => {
    console.log(err);
  })
})

router.post('/edit/:id', function(req, res) {
  req.body.id = req.param('id');
  Profile.editData(req.body).then(() => {
    res.redirect('../../profiles?message=null');
  }).catch((err) => {
    res.redirect('../../profiles?message=' + err);
  })
})

router.get('/delete/:id', function(req, res) {
  Profile.deleteData(req.param('id')).then(() => {
    res.redirect('../../profiles?message=null');
  }).catch((err) => {
    res.redirect('../../profiles?message=' + err);
  })
})

module.exports = router;
