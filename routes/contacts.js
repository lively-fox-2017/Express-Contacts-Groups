const express = require('express')
const router = express.Router()
const Contact = require('../models/contacts')

router.get('/', function(req, res) {
  Contact.viewContacts(function(err, rows) {
    res.render('contacts', {
      dataContacts: rows
    })
  })
})
//2.Add Contacts
router.post("/", function(req, res) {
  Contact.addContacts(req.body, function() {
    res.redirect("/contacts")
  })
})
//3.Delete Contacts
router.get("/delete/:id", function(req, res) {
  Contact.deleteContacts(req.params, function() {
    res.redirect("/contacts")
  })
})
// 4.Edit Contacts (MAINTENANCE)
router.get("/edit/:id", function(req, res) {
  Contact.geteditContacts(req.params, function(err, rows) {
    if (!err) {
      res.render('contacts_edit', {
        data: rows[0]
      })
    } else {
      res.send('Error')
    }
  })
})

router.post("/edit/:id", (req, res) => {
  Contact.posteditContacts(req.body, req.params, function(err,rows) {
    if (!err) {
      res.redirect("/contacts")
    } else {
      res.send("Error")
    }
  })
})

router.get("/addresses/:id", function(req, res) {
  Contact.geteditContactsAddress(req.params, function(err,dataAlamat){
    if(!err){
      Contact.viewContacts(function(err, dataContacts) {
      res.render('address_view', {dataAlamat:dataAlamat, dataContacts:dataContacts})
    })
  }
  })
})

module.exports = router;
