"use strict"

const express = require('express');
const router = express.Router();
const model = require('../models/profile');

router.get('/', (req, res)=>{
  // res.send('Profile Here')
  // res.render('profile')
  model.getAll((rows1, rows2)=>{
    res.render('profile', {dataUser:rows1, dataContact:rows2})
  });
});

router.post('/', (req, res)=>{
  model.create(req, ()=>{
    res.redirect('/profiles');
  });
});

router.get('/edit/:id', (req, res)=>{
  model.getEdit(req, (rows1, rows2)=>{
    res.render('profileEdit', {dataUser:rows1, dataContact:rows2})
  });

  // model.getEdit(req, (rows)=>{
  //   res.render('profileEdit', {data:rows});
  // });
});

router.post('/edit/:id', (req,res)=>{
  model.postEdit(req, (err, rows)=>{
    res.redirect('/profiles');
  });
});

router.get('/delete/:id', (req, res)=>{
  model.getDelete(req, (err, rows)=>{
    res.redirect('/profiles')
  });
});


module.exports = router;
