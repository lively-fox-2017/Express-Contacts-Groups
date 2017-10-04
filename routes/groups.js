"use strict"

const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/dataCompany.db')



router.get('/', (req, res) => {
    // res.send('group neh')
    // res.render('group')
    db.all(`SELECT * from groups`, (err, rows) => {
      if(err) {
        console.log(err);
      }
      res.render('group', {data: rows})
    })
});

router.post('/', (req, res)=>{
  db.run(`INSERT INTO groups (name_of_group) VALUES('${req.body.name_of_group}')`, ()=>{
    res.redirect('/groups');
  });
});

router.get('/edit/:id', (req, res)=>{
  db.all(`SELECT * FROM groups WHERE id = ${req.params.id}`, (err, rows)=>{
    res.render('groupEdit', {data: rows});
  });
});

router.post('/edit/:id', (req,res)=>{
  var data = {
    $id : `${req.params.id}`,
    $name_of_group : `${req.body.name_of_group}`
  };
  var sql = `UPDATE groups SET name_of_group = $name_of_group WHERE id = $id`;

  db.run(sql, data, (err)=>{
    if(err){
      console.log(err);
    }
  });
  res.redirect('/groups')
});

router.get('/delete/:id', (req,res)=>{
  db.run(`DELETE FROM groups WHERE id = ${req.params.id}`, ()=>{
    res.redirect('/groups');
  });
});



module.exports = router
