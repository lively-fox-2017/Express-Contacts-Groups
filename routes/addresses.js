"use strict"

const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/dataCompany.db');


router.get('/', (req, res) => {
    // res.send('inkjkkjdex')
    // res.render('address')
    db.all('SELECT * FROM addresses', (err, rows)=> {
      if(err){
        console.log(err);
      }
      res.render('address', {data: rows})
    })

});

router.post('/', (req,res)=>{
  db.run(`INSERT INTO addresses (street, city, zipcode) VALUES('${req.body.street}', '${req.body.city}', '${req.body.zipcode}')`, ()=>{
    res.redirect('/addresses')
  })
})

router.get('/edit/:id', (req,res)=>{
  db.all(`SELECT * FROM addresses WHERE id = ${req.params.id}`, (err,rows)=>{
    res.render('addressEdit', {data: rows});
  });
});


router.post('/edit/:id', (req,res)=>{
  var data = {
    $id : `${req.params.id}`,
    $street : `${req.body.street}`,
    $city : `${req.body.city}`,
    $zipcode : `${req.body.zipcode}`
  };
  var sql = `UPDATE addresses SET street = $street, city = $city, zipcode = $zipcode WHERE id = $id`;

  db.run(sql, data, (err)=>{
    if(err){
      console.log(err);
    };
  });
  res.redirect('/addresses')
});

router.get('/delete/:id', (req,res)=>{
  db.run(`DELETE FROM addresses WHERE id = ${req.params.id}`, ()=>{
    res.redirect('/addresses');
  });
});


module.exports = router
