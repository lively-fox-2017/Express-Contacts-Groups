const express = require('express')
const router = express.Router()
const Address = require('../models/addresses')

router.get('/', function(req,res) {
  Address.getDataAddress((rowAddress,rowContacts) => {
    res.render('addresses', {dataAddress: rowAddress, dataContacts: rowContacts})
  })
})

router.get('/addaddresses', function(req,res) {
  Address.getDataAddress((rowAddress,rowContacts) => {
    res.render('addaddresses', {dataAddress: rowAddress, dataContacts: rowContacts})
  })
})

router.post('/addaddresses', function(req,res) {
  Address.addDataAddress(req.body, () => {
    res.redirect('/addresses')
  })
})

router.get('/delete/:id', function(req,res) {
  Address.deleteDataAddress(req.params.id, () => {
    res.redirect('/addresses')
  })
})

router.get('/edit/:id', function(req,res) {
  Address.findDataById(req.params.id, (rowAddress,rowContacts) => {
    res.render('editaddresses', {dataAddress: rowAddress,  dataContacts: rowContacts})
    // res.send(rowAddress)
  })
})

router.post('/edit/:id', function(req,res) {
  Address.editDataAddress(req.body, req.params.id, () => {
    res.redirect('/addresses')
  })
})

module.exports = router
