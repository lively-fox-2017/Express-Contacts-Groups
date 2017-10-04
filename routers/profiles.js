// express
const express = require('express');
const router = express.Router();

// sqlite3
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');

// import model profile
const Profile = require('../models/profiles');

// import model profile
const Contact = require('../models/contacts');

router.get('/profile', function(req, res){
  // db.all('SELECT profile.*, contacts.name FROM profile LEFT JOIN contacts ON profile.id_contacts = contacts.id', function(err, rows1){
  //   db.all('SELECT * FROM contacts', function(err, rows2){
  //   if(err){
  //     console.log('error to show data');
  //   }
  //   res.render('profile/index', {profile: rows1, contacts: rows2});
  //   });
  // });
  Profile.getAllProfiles(function(profiles){
    Contact.getAllContacts(function(contacts){
      res.render('profile/index', {profile: profiles, contacts: contacts});
    });
  });
});

router.get('/profile/edit/:id', function(req, res){
  Profile.getByIDProfile(req.params.id, function(profile){
    res.render('profile/edit', {profile: profile});
  });
});

router.post('/profile', function(req, res){
  Profile.insertProfile(req.body.username, req.body.password, req.body.id_contacts, function(err){
    if(err){
      res.send('Error: SQLITE_CONSTRAINT: UNIQUE constraint failed: profile.id_contacts errno: 19, code: SQLITE_CONSTRAINT')
    }
    res.redirect('/profile');
  });
});

router.post('/profile/edit/:id', function(req, res){
  Profile.updateProfile(req.body.username, req.body.password, req.params.id, function(){
    res.redirect('/profile');
  });
});

router.get('/profile/delete/:id', function(req, res){
  Profile.deleteProfile(req.params.id, function(){
    res.redirect('/profile');
  });
});

module.exports = router;