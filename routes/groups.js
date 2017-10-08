const express = require('express')
const router = express.Router()
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('data.db');
const Model = require('../models/groupsModels')


router.get('/group', (req, res) => {
  Model.getAllGroup().then((result)=>{
    //res.send(result)
    res.render('pages/group', {temp : result})
  })
})

router.post('/group', (req, res) => {

  Model.insertGroup(req.body.name).then(res.redirect('/group'))
})

router.get('/deleteGroup/:id', (req, res) => {

  Model.deleteGroup(req.params.id).then(res.redirect('/group'))
})

router.get('/editGroup/:id', (req, res) => {

  Model.getGroupById(req.params.id).then((group)=>{
  	//res.send(group)
  	res.render('pages/editGroup', {group : group})
  })
});


router.post('/editGroupFinal', (req, res) => {

  Model.updateGroup(req.body.name_of_group, req.body.id).then(res.redirect('/group'))
})

module.exports = router