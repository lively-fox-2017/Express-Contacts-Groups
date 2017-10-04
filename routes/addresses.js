const express = require('express')
const router = express.Router()
const Address = require('../models/addresses')
const Contact = require('../models/contacts')

router.get('/', function(req,res) {
  Address.findAll()
  .then(dataAddress => {
    Contact.findAll()
    .then(dataContact => {
      for (let i = 0; i < dataAddress.length; i++) {
        for (let j = 0; j < dataContact.length; j++) {
          if (dataAddress[i].id_contacts == dataContact[j].id){
            dataAddress[i].name = dataContact[j].name
          }
        }
      }
      res.render('addresses/addresses', {dataAddress: dataAddress, dataContact: dataContact})
      // res.send(dataAddress)
    })
  })
})

router.get('/add', function(req,res) {
  Address.findAll()
  .then(dataAddress => {
    Contact.findAll()
    .then(dataContact => {
      res.render('addresses/add', {dataAddress: dataAddress, dataContact: dataContact})
    })
  })
  .catch(err => {
    res.send(err)
  })
})

router.post('/add', function(req,res) {
  Address.createAddress(req)
  .then(dataAddress => {
    res.redirect('/addresses')
  })
  .catch(err => {
    res.send(err)
  })
})

router.get('/delete/:id', function(req,res) {
  Address.deleteAddress(req)
  .then(dataAddress => {
    res.redirect('/addresses')
  })
  .catch(err => {
    res.send(err)
  })
})

router.get('/edit/:id', function(req,res) {
  Address.findById(req)
  .then(dataAddress => {
    Contact.findAll()
    .then(dataContact=> {
      res.render('addresses/edit', {dataAddress: dataAddress[0], dataContact: dataContact})
    })
  })
  .catch(err => {
    res.send(err)
  })
})

router.post('/edit/:id', function(req,res) {
  Address.updateAddress(req)
  .then(dataAddress => {
    res.redirect('/addresses')
  })
  .catch(err => {
    res.send(err)
  })
})

module.exports = router
