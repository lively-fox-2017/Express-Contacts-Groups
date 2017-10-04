"use strict"

const express = require('express');
const router = express.Router();
const model = require('../models/group');


router.get('/', (req, res) => {
  model.getAll((rows)=> {
    res.render('group', {data: rows})
  })
});

router.post('/', (req, res)=>{
  model.create(req, ()=>{
    res.redirect('/groups')
  })
});

router.get('/edit/:id', (req, res)=>{
  model.getEdit(req, (rows)=>{
    res.render('groupEdit', {data: rows});
  })
});

router.post('/edit/:id', (req,res)=>{
  model.postEdit(req, (err, rows)=>{
    res.redirect('/groups')
  });
});

router.get('/delete/:id', (req,res)=>{
  model.getDelete(req, (err, rows)=>{
    res.redirect('/groups');
  });
});

module.exports = router
