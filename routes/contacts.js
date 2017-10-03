const express = require('express')
const router = express.Router()
const Contact = require('../models/contacts')

router.get('/', function(req,res) {
  Contact.getDataContacts((rows) => {
    res.render('contacts', {dataContacts: rows})
  })
})

router.get('/addcontacts', function(req,res) {
  Contact.getDataContacts(() => {
    res.render('addcontacts')
  })
})

router.post('/addcontacts', function(req,res) {
  Contact.addDataContact(req.body, () => {
    res.redirect('/contacts')
  })
})

router.get('/delete/:id', function(req,res) {
  Contact.deleteDataContact(req.params.id, () => {
    res.redirect('/contacts')
  })
})

router.get('/edit/:id', function(req,res) {
  Contact.findDataById(req.params.id, (rows) => {
    res.render('editcontacts', {dataContacts: rows})
    // res.send(rows)
  })
})

router.post('/edit/:id', function(req,res) {
  Contact.editDataContact(req.body, req.params.id, () => {
    res.redirect('/contacts')
  })
})


module.exports = router
