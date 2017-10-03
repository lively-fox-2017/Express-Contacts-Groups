// express
const express = require('express');
const router = express.Router();

// sqlite3
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');

router.get('/profile', function(req, res){
  db.all('SELECT profile.*, contacts.name FROM profile LEFT JOIN contacts ON profile.id_contacts = contacts.id', function(err, rows1){
    db.all('SELECT * FROM contacts', function(err, rows2){
    if(err){
      console.log('error to show data');
    }
    res.render('profile/index', {profile: rows1, contacts: rows2});
    });
  });
});

router.post('/profile', function(req, res){
  db.exec(`INSERT INTO profile (username, password, id_contacts) VALUES ('${req.body.username}', '${req.body.password}', '${req.body.id_contacts}')`, function(err, rows){
    if(err){
      res.send('Error: SQLITE_CONSTRAINT: UNIQUE constraint failed: profile.id_contacts errno: 19, code: SQLITE_CONSTRAINT')
    }
    res.redirect('/profile');
  })
});

router.get('/profile/edit/:id', function(req, res){
  db.get(`SELECT * FROM profile WHERE id = ${req.params.id}`, function(err, rows){
    if(err){
      console.log('error to show data');
    }
    res.render('profile/edit', {profile: rows});
  });
});

router.post('/profile/edit/:id', function(req, res){
  db.exec(`UPDATE profile SET username = '${req.body.username}', password = '${req.body.password}' WHERE id = ${req.params.id}`, function(err, rows){
    if(err){
      console.log('error to update data');
    }
    res.redirect('/profile');
  });
});

router.get('/profile/delete/:id', function(req, res){
  db.exec(`DELETE FROM profile WHERE id = ${req.params.id}`, function(err, rows){
    if(err){
      console.log('error to delete data');
    }
    res.redirect('/profile');
  });
});

module.exports = router;