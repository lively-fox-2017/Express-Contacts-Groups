// express
const express = require('express');
const router = express.Router();

// sqlite3
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');

router.get('/addresses', function(req, res){
  db.all('SELECT addresses.*, contacts.name FROM addresses LEFT JOIN contacts ON addresses.id_contacts = contacts.id', function(err, rows1){
    db.all('SELECT * FROM contacts', function(err, rows2){
  	if(err){
  	  console.log('error to show data');
  	}
  	res.render('addresses/index', {addresses: rows1, contacts: rows2});
    });
  });
});

router.post('/addresses', function(req, res){
  db.exec(`INSERT INTO addresses (street, city, zipcode, id_contacts) VALUES ('${req.body.street}', '${req.body.city}', '${req.body.zipcode}', '${req.body.id_contacts}')`, function(err, rows){
  	if(err){
  	  console.log('error to add data');
  	}
  	res.redirect('/addresses')
  });
});

router.get('/addresses/edit/:id', function(req, res){
  db.get(`SELECT * FROM addresses WHERE id = ${req.params.id}`, function(err, rows1){
    db.all('SELECT * FROM contacts', function(err, rows2){
  	if(err){
  	  console.log('error to show data');
  	}
  	res.render('addresses/edit', {addresses: rows1, contacts: rows2});
    });
  });
});

router.post('/addresses/edit/:id', function(req, res){
  db.exec(`UPDATE addresses SET street = '${req.body.street}', city = '${req.body.city}', zipcode = '${req.body.zipcode}', id_contacts = '${req.body.id_contacts}' WHERE id = ${req.params.id}`, function(err, rows){
  	if(err){
  		console.log('error to update data');
  	}
  	res.redirect('/addresses');
  });
});

router.get('/addresses/delete/:id', function(req, res){
  db.exec(`DELETE FROM addresses WHERE id = ${req.params.id}`, function(err, rows){
  	if(err){
  	  console.log('error to delete data');
  	}
  	res.redirect('/addresses');
  })
});

module.exports = router;