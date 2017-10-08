const express = require('express')
const router = express.Router()
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('data.db');
const Models = require('../models/profilesModels')
const MContact = require('../models/contactsModel')


router.get('/profile', (req, res) => {

  Models.getAllProfile().then((result) =>{
    res.render('pages/profile', {temp : result.resultProfile, temp1 : result.contacts, message :''})
  })
})

router.post('/profile', (req, res) => {

  Models.insertProfile(req.body.username, req.body.password, req.body.id_contact).then(err =>{
    if(!err){
      res.redirect('profile')
    }else{
      Models.getAllProfile().then((result)=>{
        res.render('pages/profile', {temp : result.resultProfile, temp1 : result.contacts, message :'Data sudah ada guys'})
      })
    }
  })
})

router.get('/deleteProfile/:id', (req, res) => {

  Models.deleteProfile(req.params.id).then(res.redirect('/profile'))
})

router.get('/editProfile/:id', function(req, res) {

  Models.getProfileById(req.params.id).then((result) =>{
    res.render('pages/editProfile', {temp : result})
  }) 
})


router.post('/editProfileFinal', (req, res) => {

  Models.updateProfile(req.body.username, req.body.password, req.body.id).then(res.redirect('/profile'))
})

module.exports = router