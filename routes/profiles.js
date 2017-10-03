const express = require('express')
const router = express.Router()
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('data.db');
const Models = require('../models/profilesModels')

router.get('/profile', (req, res) => {

  Models.getAllProfile((resultProfile, contacts, err) =>{
    if(err){
      console.log('gagal guys')
    }else{
      res.render('pages/profile', {temp : resultProfile, temp1 : contacts , message : ''})
    }
  })
})

router.post('/profile', (req, res) => {

  	Models.insertProfile(req.body.username, req.body.password, req.body.id_contact, (err) =>{
      if(!err){
        res.redirect('profile')
      }else{
        Models.getAllProfile((resultProfile, contacts, err) =>{
          if(err){
          console.log('gagal guys')
          }else{
            res.render('pages/profile', {temp : resultProfile, temp1 : contacts , message : 'Data sudah ada guys'})
          }
        })      
      }
    })
})

router.get('/deleteProfile/:id', (req, res) => {

  Models.deleteProfile(req.params.id, err =>{
    if(!err){
      res.redirect('/profile')
    }
  })
})

router.get('/editProfile/:id', function(req, res) {

  Models.getProfile(req.params.id, (err, profiles) =>{
    if(!err){
      res.render('pages/editProfile', {temp : profiles})
    }
  }) 
})


router.post('/editProfileFinal', (req, res) => {

  Models.updateProfile(req.body.username, req.body.password, req.body.id, err =>{
    if(!err){
      res.redirect('/profile')
    }
  })
})

module.exports = router