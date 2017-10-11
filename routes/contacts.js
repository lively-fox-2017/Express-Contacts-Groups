const express = require('express')
const router = express.Router()
const Contact = require('../models/contacts')

router.get('/', function(req,res) {
  Contact.findAll()
  .then(dataContact => {
    res.render('contacts/contacts', {dataContact: dataContact})
  })
  .catch(err => {
    res.send(err)
  })
})

router.get('/add', function(req,res) {
  Contact.findAll()
  .then(dataContact => {
    res.render('contacts/add', {dataContact: dataContact})
  })
  .catch(err => {
    res.send(err)
  })
})

router.post('/add', function(req,res) {
  Contact.createContact(req)
  .then(dataContact => {
    res.redirect('/contacts')
  })
  .catch(err => {
    res.send(err)
  })
})

router.get('/delete/:id', function(req,res) {
  Contact.deleteContact(req)
  .then(deleteContact => {
    res.redirect('/contacts')
  })
  .catch(err => {
    res.send(err)
  })
})

router.get('/edit/:id', function(req,res) {
  Contact.findById(req)
  .then(dataContact => {
    res.render('contacts/edit', {dataContact: dataContact[0]})
  })
  .catch(err => {
    res.send(err)
  })
})

router.post('/edit/:id', function(req,res) {
  Contact.updateContact(req)
  .then(dataContact => {
    res.redirect('/contacts')
  })
  .catch(err => {
    res.send(err)
  })
})

module.exports = router
