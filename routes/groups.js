const express = require('express')
const router = express.Router()
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('data.db');
const Model = require('../models/groupsModels')

router.get('/group', (req, res) => {

  Model.getAllGroup((err, resultGroups) =>{
    if(err){
      console.log(err)
    }else{
      res.render('pages/group', {temp : resultGroups})
    }
  })
})

router.post('/group', (req, res) => {

  Model.insertGroup(req.body.name, err =>{
    if(!err){
      res.redirect('/group')
    }
  })
})

router.get('/deleteGroup/:id', (req, res) => {

  Model.deleteGroup(req.params.id, err =>{
    if(!err){
      res.redirect('/group')
    }
  })
})

router.get('/editGroup/:id', (req, res) => {

  Model.getGroup(req.params.id, (err, groups) =>{
    if(!err){
      res.render('pages/editGroup', {temp : groups})
    }
  })
});


router.post('/editGroupFinal', (req, res) => {

  Model.updateGroup(req.body.name_of_group, req.body.id, err =>{
    if(!err){
      res.redirect('/group')
    }
  })
})

module.exports = router