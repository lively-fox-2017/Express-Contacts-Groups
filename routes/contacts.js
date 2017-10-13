const express = require('express')
const router = express.Router()
const Contact = require('../models/contact')

router.get('/', (req,res)=>{
  Contact.findAll()
  .then(contacts => {
    res.render('contacts',{dataContacts:contacts})
  })
  .catch(err => {
    res.send(err)
  })
})

router.get('/add', (req,res)=>{
  Contact.findAll()
  .then(contacts =>{
    res.render('add_contacts',{dataContacts:contacts})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/add', (req,res)=>{
  Contact.add(req)
  .then(contacts =>{
    res.redirect('/contacts')
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/delete/:id',(req,res)=>{
  Contact.delete(req)
  .then(contacts =>{
    res.redirect('/contacts')
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/edit/:id',(req,res)=>{
  Contact.findById(req)
  .then(contacts=>{
    res.render('edit_contacts',{dataContacts:contacts})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/edit/:id',(req,res)=>{
  Contact.edit(req)
  .then(contacts=>{
    res.redirect('/contacts')
  })
  .catch(err=>{
    res.send(err)
  })
})

module.exports = router
