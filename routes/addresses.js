const express = require('express')
const router = express.Router()
const Address = require('../models/address')
const Contact = require('../models/contact')

router.get('/', (req,res)=>{
  Address.findAll()
  .then(addresses => {
    Contact.findAll()
    .then(contacts =>{
      for (var i = 0; i < addresses.length; i++) {
        for (var j = 0; j < contacts.length; j++) {
          if(addresses[i].idContacts == contacts[j].id){
            addresses[i].name = contacts[j].name
          }
        }
      }
      res.render('addresses',{dataAddress:addresses})
    })
      .catch(err => {
      res.send(err)
    })
  })
})

router.get('/add', (req,res)=>{
  Address.findAll()
  .then(addresses =>{
    Contact.findAll()
      .then(contacts =>{
      res.render('add_addresses',{dataAddress:addresses, dataContacts:contacts})
      })
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/add', (req,res)=>{
  Address.add(req)
  .then(addresses =>{
    res.redirect('/addresses')
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/delete/:id',(req,res)=>{
  Address.delete(req)
  .then(addresses =>{
    res.redirect('/addresses')
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/edit/:id',(req,res)=>{
  Address.findById(req)
  .then(addresses=>{
    Contact.findAll()
    .then(contacts=>{
      res.render('edit_addresses',{dataAddress:addresses,dataContacts:contacts})
    })
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/edit/:id',(req,res)=>{
  Address.edit(req)
  .then(addresses=>{
    res.redirect('/addresses')
  })
  .catch(err=>{
    res.send(err)
  })
})

module.exports = router
