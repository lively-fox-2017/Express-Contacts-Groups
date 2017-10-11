const express = require('express')
const router = express.Router()
const Profile = require('../models/profiles')

router.get('/', function(req,res) {
  Profile.getDataProfile((rowProfiles,rowContacts) => {
    res.render('profiles', {dataProfiles: rowProfiles, dataContacts: rowContacts})
    // res.send(rowContacts)
  })
})

router.get('/addprofiles', function(req,res) {
  Profile.getDataProfile((rowProfiles,rowContacts) => {
    res.render('addprofiles', {dataProfiles: rowProfiles, dataContacts: rowContacts, dataError: null})
  })
})

router.post('/addprofiles', function(req,res) {
  Profile.addDataProfile(req.body, (err) => {
    if (err) {
      // console.log(err.code);
      if(err.code === 'SQLITE_CONSTRAINT') {
        Profile.getDataProfile((rowProfiles,rowContacts) => {
          res.render('addprofiles', {dataProfiles: rowProfiles, dataContacts: rowContacts, dataError: 'Nama Sudah ada'})
        })
      }
    } else {
      res.redirect('/profiles')
    }
  })
})

router.get('/delete/:id', function(req,res) {
  Profile.deleteDataProfile(req.params.id, () => {
    res.redirect('/profiles')
  })
})

router.get('/edit/:id', function(req,res) {
  // console.log("========",req.query);
  let error = '';

  if(req.query.hasOwnProperty('error')) {
    error = "Double contact"
  }

  Profile.findDataById(req.params.id, (rowProfiles,rowContacts) => {
    // if(req.query) {
    //   error = req.query.error
    // }
    res.render('editprofiles', {dataProfiles: rowProfiles, dataContacts: rowContacts, error: error})
    // res.send(rows)
  })
})

router.post('/edit/:id', function(req,res) {
  Profile.editDataProfile(req.body, req.params.id, (err) => {
    if (err) {
      if (err.code === 'SQLITE_CONSTRAINT') {
        res.redirect(`/profiles/edit/${req.params.id}?error=error`)
      }
    }else{
      res.redirect('/profiles')
    }
  })
})


module.exports = router
