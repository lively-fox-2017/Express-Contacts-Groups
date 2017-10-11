const express = require('express')
const router = express.Router()
const Profile = require('../models/profiles')
const Contact = require('../models/contacts')

router.get('/', function(req,res) {
  Profile.findAll()
  .then(dataProfile => {
    Contact.findAll()
    .then(dataContact => {
      for (let i = 0; i < dataProfile.length; i++) {
        for (let j = 0; j < dataContact.length; j++) {
          if (dataProfile[i].id_contacts == dataContact[j].id){
            dataProfile[i].name = dataContact[j].name
          }
        }
      }
      res.render('profiles/profiles', {dataProfile: dataProfile, dataContact: dataContact})
      // res.send(dataAddress)
    })
  })
})

router.get('/add', function(req,res) {
  Profile.findAll()
  .then(dataProfile => {
    Contact.findAll()
    .then(dataContact => {
      res.render('profiles/add', {dataProfile: dataProfile, dataContact: dataContact, dataError: null})
    })
  })
  .catch(err => {
    res.send(err)
  })
})

router.post('/add', function(req,res) {
  Profile.createProfile(req)
  .then(dataAddress => {
    if (!err) {
      res.redirect('/profiles')
    }
  })
  .catch(err => {
    // res.send(err)
    if (err) {
      if (err.code === 'SQLITE_CONSTRAINT') {
        Profile.findAll()
        .then(dataProfile => {
          Contact.findAll()
          .then(dataContact => {
            res.render('profiles/add', {dataProfile: dataProfile, dataContact: dataContact, dataError: 'NAMA CONTACT SUDAH DI PAKAI'})
          })
        })
      }
    }
  })
})

router.get('/delete/:id', function(req,res) {
  Profile.deleteProfile(req)
  .then(dataAddress => {
    res.redirect('/profiles')
  })
  .catch(err => {
    res.send(err)
  })
})

router.get('/edit/:id', function(req,res) {
  Profile.findById(req)
  .then(dataProfile => {
    Contact.findAll()
    .then(dataContact=> {
      res.render('profiles/edit', {dataProfile: dataProfile[0], dataContact: dataContact, dataError: null})
    })
  })
  .catch(err => {
    res.send(err)
  })
})

router.post('/edit/:id', function(req,res) {
  Profile.updateProfile(req)
  .then(dataProfile => {
    res.redirect('/profiles')
  })
  .catch(err => {
    // res.send(err)
    if (err) {
      if (err.code === 'SQLITE_CONSTRAINT') {
        Profile.findById(req)
        .then(dataProfile => {
          Contact.findAll()
          .then(dataContact=> {
            res.render('profiles/edit', {dataProfile: dataProfile[0], dataContact: dataContact, dataError:'ID CONTACT SUDAH DI PAKAI'})
          })
        })
        .catch(err => {
          res.send(err)
        })

      }
    }
  })
})

module.exports = router
