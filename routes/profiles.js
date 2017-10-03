const express = require('express')
const router = express.Router()
const Profile = require('../models/profiles')
const Contact = require('../models/contacts')

//1.View Profiles
router.get('/', function(req,res) {
  Profile.viewProfiles(function(err,rows) {
    if (!err) {
      Contact.viewContacts((err, dataContacts) => {
        res.render('profiles', {dataProfiles: rows,dataContacts: dataContacts,errData: null});
      })
    }
  })
})
//2.Add Profiles
router.post("/", function(req, res) {
  Profile.addProfile(req.body, function(err, rows) {
      if (err.code == 'SQLITE_CONSTRAINT') {
        Profile.viewProfiles(function(err, rows) {
          if (!err) {
            Contact.viewContacts((err, dataContacts) => {
              res.render('profiles', {dataProfiles: rows, dataContacts: dataContacts,errData: 'ID Sudah Digunakan'});
            })
          }
        })
      } else {
        res.redirect("/profiles")
      }
  })
})
// 3.Delete Profiles
router.get("/delete/:id", function(req, res) {
  Profile.deleteProfile(req.params, function() {
    res.redirect("/profiles")
  })
})
// 4. Get Edit Profiles
router.get("/edit/:id", function(req, res) {
  Profile.geteditProfiles(req.params, function(err, rows) {
    if (!err) {
      Contact.viewContacts(function(err, data) {
        res.render('profiles_edit', {
          dataProfiles: rows[0],
          dataContacts: data,
          errData:null
        })
      })
    } else {
      res.send('Error')
    }
  })
})
// 5. Post Edit Profiles
router.post("/edit/:id", function(req, res) {
  Profile.posteditProfiles(req.body, req.params, function(err) {
    if (err) {
      Profile.geteditProfiles(req.params, function(err, rows) {
        if (!err) {
          Contact.viewContacts(function(err, data) {
            res.render('profiles_edit', {
              dataProfiles: rows[0],
              dataContacts: data,
              errData: 'ID Sudah Digunakan'
            })
          })
        }
      })
    } else {
      res.redirect("/profiles")
    }
  })
})

module.exports = router
