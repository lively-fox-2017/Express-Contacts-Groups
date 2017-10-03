// express
const express = require('express');
const router = express.Router();

// sqlite3
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');

router.get('/groups', function(req, res){
  db.all('SELECT * FROM groups', function(err, rows){
  	if(err){
  		console.log('error to show data');
  	}
  	res.render('groups/index', {groups: rows});
  })
});

router.post('/groups', function(req, res){
  db.exec(`INSERT INTO groups (name_of_group) VALUES ('${req.body.name_of_group}')`, function(err, rows){
 	if(err){
 		console.log('error to add data');
 	}
 	res.redirect('/groups');
	});
});

router.get('/groups/edit/:id', function(req, res){
  db.get(`SELECT * FROM groups WHERE id = ${req.params.id}`, function(err, rows){
  	if(err){
  	  console.log('error to show data');
  	}
  	res.render('groups/edit', {groups: rows});
  });
});

router.post('/groups/edit/:id', function(req, res){
  db.exec(`UPDATE groups SET name_of_group = '${req.body.name_of_group}' WHERE id = ${req.params.id}`, function(err, rows) {
  	if(err){
  	  console.log('error to change data');
  	}
  	res.redirect('/groups');
  });
});

router.get('/groups/delete/:id', function(req, res){
  db.exec(`DELETE FROM groups WHERE id = ${req.params.id}`, function(err, rows){
  	if(err){
  	  console.log('error to delete data');
  	}
  	res.redirect('/groups');
  });
});

module.exports = router;