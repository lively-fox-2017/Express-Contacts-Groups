"use strict"

const express = require('express');
const router = express.Router();
const model = require('../models/contact');


router.get('/', (req, res) => {
  model.getAll((rows)=>{
    res.render('contact', {data: rows})
  });
});

router.post('/', (req, res) =>{
  model.create(req, ()=>{
    res.redirect('/contacts');
  });
});


router.get('/edit/:id', (req, res)=>{
  model.getEdit(req, (rows)=>{
    res.render('contactEdit', {data: rows});
  });
});

router.post('/edit/:id', (req,res)=>{
  model.postEdit(req, (err, rows) => {
    res.redirect('/contacts');
  })
});

router.get('/delete/:id', (req, res)=>{
  model.getDelete(req, (err, rows)=>{
    res.redirect('/contacts');
  });
});

module.exports = router
