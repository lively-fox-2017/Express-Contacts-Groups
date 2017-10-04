const express = require('express')
const router = express.Router()
const Profile = require('../models/profile')
const Contact = require('../models/contact')
router.get('/', (req, res) => {
  Profile.findAll()
    .then(profiles => {
      Contact.findAll()
      .then(contacts=>{
        for (var i = 0; i < profiles.length; i++) {
          for (var j = 0; j < contacts.length; j++) {
            if(contacts[j].id==profiles[i].idContacts){
              profiles[i].name = contacts[j].name
            }
          }
        }
        res.render('profiles', {dataProfiles: profiles, dataContacts:contacts})
      })
    })
    .catch(err => {
      res.send(err)
    })
})

router.get('/add', (req,res)=>{
  Profile.findAll(req)
  .then(profiles =>{
    Contact.findAll(req)
    .then(contacts=>{
      res.render('add_profiles', {dataProfiles:profiles,dataContacts:contacts, dataError:null})
    })
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/add', (req,res)=>{
  Profile.add(req)
  .then(profiles =>{
    res.redirect('/profiles')
  })
  .catch(err=>{
    // res.send(err)
    if(err){
      if(err.code == 'SQLITE_CONSTRAINT'){
        Profile.findAll()
        .then(profiles=>{
          Contact.findAll()
          .then(contacts=>{
            res.render('add_profiles', {dataProfiles:profiles, dataContacts:contacts, dataError:'ID sudah digunakan'})
          })
        })
      }
    }
  })
})

router.get('/delete/:id', (req,res)=>{
  Profile.delete(req)
  .then(profiles =>{
    res.redirect('/profiles')
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/edit/:id',(req,res)=>{
  Profile.findById(req)
  .then(profiles =>{
    Contact.findAll()
    .then(contacts=>{
      res.render('edit_profiles', {dataProfiles:profiles[0],dataContacts:contacts, dataError:null})
    })
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/edit/:id', (req,res)=>{
  Profile.edit(req)
  .then(profiles=>{
    res.redirect('/profiles')
  })
  .catch(err=>{
    if(err){
      if(err.code == 'SQLITE_CONSTRAINT'){
        Profile.findAll()
        .then(profiles=>{
          Contact.findAll()
          .then(contacts=>{
            res.render('edit_profiles', {dataProfiles:profiles[0], dataContacts:contacts, dataError:'ID sudah digunakan'})
          })
        })
      }
    }
  })
})







module.exports = router
