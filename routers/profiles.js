const express = require('express')
const router = express.Router()
const Contact = require('../Models/contacts')
const Profile = require('../Models/profiles')
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/data.db');




  router.get('/', function(req, res){
    Profile.findAll()
    .then((dataProfiles)=>{
      //console.log(dataProfiles);
      Contact.findAll()
      .then(function(row) {
        res.render('profiles', {err: null, dataProfile: dataProfiles, dataContact: row})
      })
    })
    .catch(err=>{
      res.send(err);
    })
  })



  router.post('/', function(req, res){
    Profile.make(req.body)
    .then(()=>{
        res.redirect('/profiles')
      })
    .catch((err)=>{
      Profile.findAll()
        .then((dataProfiles, row)=>{
          res.render('error',{err:'ID SUDAH TERPAKAI', data:dataProfiles, dataContact:row})
        })
      })
  })


router.get('/edit/:id', function(req, res){
  Profile.findById(req.params.id)
  .then((rowProfile)=>{
    //console.log(dataProfile);
  Contact.findAll()
    .then(function(row){

        res.render('editProfile',{err:null, data:rowProfile, data2:row})
    })
  })
    .catch(err=>{
      res.send(err)
    })
})


router.post('/edit/:id', function (req, res){
    Profile.updateProf(req.body, req.params)
    .then((dataProfile)=>{
      res.redirect('profiles')
    })
    .catch(err=>{
      Profile.findAll()
      .then((rowProfile)=>{
        Contact.findAll()
        .then((rowContact)=>{
          console.log(rowContact);
          res.render('error', {err:'ID DOUBLE', dataProfile:rowProfile, dataContact:rowContact})
        })
      })
  })
})



router.get('/delete/:id', function(req, res){
  Profile.deleteProf(req.params)
  .then((err)=>{
    if(!err){
      res.redirect('/contacts')
    }
  })
})


module.exports = router;
