// express
const express = require('express');
const app = express();
const router = express.Router();

// body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// import model profile
const Profile = require('../models/profiles');

// import model contact
const Contact = require('../models/contacts');

router.get('/profile', function(req, res){
  Promise.all([
    Profile.getAllProfiles(),
    Contact.getAllContacts()
    ]).then((rows) => {
      res.render('profile/index', {profile: rows[0], contacts: rows[1]});
    });
});

router.get('/profile/edit/:id', function(req, res){
  Profile.getByIDProfile(req.params.id).then((rows) => {
    res.render('profile/edit', {profile: rows});
  });
});

router.post('/profile', function(req, res){
  Profile.insertProfile(req.body.username, req.body.password, req.body.id_contacts).then((rows) => {
    res.redirect('/profile');
  }).catch((err) => {
    res.send('Error: SQLITE_CONSTRAINT: UNIQUE constraint failed: profile.id_contacts errno: 19, code: SQLITE_CONSTRAINT')
  });
});

router.post('/profile/edit/:id', function(req, res){
  Profile.updateProfile(req.body.username, req.body.password, req.params.id).then((rows) => {
    res.redirect('/profile');
  });
});

router.get('/profile/delete/:id', function(req, res){
  Profile.deleteProfile(req.params.id).then((rows) => {
    res.redirect('/profile');
  });
});

module.exports = router;