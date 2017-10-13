const express = require('express')
const router = express.Router()
const Address = require('../models/addresses')
const Contact = require('../models/contacts')

router.get("/", function(req, res) {
  Address.viewAddresses(function(err, rows) {
    if(!err){
      Contact.viewContacts(function(err,dataContacts){
        res.render('addresses', {
          dataAddresses: rows,
          dataContacts : dataContacts
        });
      })
    }
  })
})

router.post("/", function(req, res) {
  Address.addAddresses(req.body, function() {
    res.redirect("/addresses")
  })
})

router.get("/delete/:id", function(req, res) {
  Address.deleteAddresses(req.params, function() {
    res.redirect("/addresses")
  })
})

router.get("/edit/:id", function(req, res) {
  Address.geteditAddresses(req.params, function(dataAddresses, dataContacts) {
      res.render('addresses_edit', {
        dataAddresses: dataAddresses[0],dataContacts:dataContacts
      })
  })
})

router.post("/edit/:id", function(req, res) {
  Address.posteditAddresses(req.body, req.params, function(err) {
    if (!err) {
      res.redirect("/addresses")
    } else {
      res.send("Error")
    }
  })
})

module.exports = router
