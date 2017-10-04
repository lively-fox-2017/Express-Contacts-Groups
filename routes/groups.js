const express = require('express')
const router = express.Router();
const modelsGroups = require('../models/groups')
const modelsContactsGroups = require('../models/contactsGroups')
const modelsContacts = require('../models/contacts')

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/database.db');

//groups
router.get('/', (req, res) => {
  modelsGroups.findAll()
  .then((dataGroups)=>{console.log('------');
    modelsContactsGroups.findAll()
    .then((members)=>{console.log('asdfas');
      modelsGroups.joinDataGroupsMembers(dataGroups,members)
      .then((dataMembers)=>{
        // res.send(dataMembers);
        res.render('groups',{data:dataMembers})
      })
    })
  })
  .catch((err)=>{
    res.send(err);
  })
})
router.post('/', (req, res) => {
  modelsGroups.insertData(req.body)
  .then((result)=>{
      res.redirect('/groups');
  })
  .catch((err)=>{
    res.send(err);
  })
})
router.get('/delete/:id', (req, res) => {
  modelsGroups.deleteData(req.params)
  .then((result)=>{
      res.redirect('/groups')
  })
  .catch((err)=>{
    res.send(err);
  })
})
router.get('/edit/:id', (req, res) => {
  modelsGroups.findById(req.params.id)
  .then((data)=>{
      // res.send(data)
      res.render('groups_edit',{data:data});
  })
  .catch((err)=>{
    res.send(err);
  })
})
router.post('/edit/:id', (req, res) => {
  modelsGroups.updateData(req.body,req.params)
  .then((result)=>{
      res.redirect('/groups');
  })
  .catch((err)=>{
    res.send(err);
  })
})

router.get('/:id/assign_contacts', (req, res) => {
  modelsGroups.findById(req.params.id)
  .then((data)=>{
    modelsContacts.findAll()
    .then((dataContacts)=>{
        res.render('assign_contacts',{data:data,dataContacts:dataContacts})
    })
  })
  .catch((err)=>{
    res.send(err);
  })
})

router.post('/:id/assign_contacts', (req, res) => {
  req.body["groupId"]=req.params.id;
  modelsContactsGroups.insertData(req.body)
  .then((err)=>{
      res.redirect(`/groups`);
  })
  .catch((err)=>{
    res.send(err);
  })
})

router.get('/:id/unassign_contacts', (req, res) => {
  modelsGroups.findById(req.params.id)
  .then((data)=>{
    modelsContactsGroups.findByGroupId(req.params.id)
    .then((dataMembers)=>{
      // console.log(data);
      res.render('unassign_contacts',{data:data,dataMembers:dataMembers})
    })
  })
  .catch((err)=>{
    res.send(err);
  })
})

router.get('/:id/unassign_contact/:ContactGroupId', (req, res) => {
  // console.log(req.params);
  modelsContactsGroups.deleteData(req.params)
  .then(function(result){
      res.redirect(`/groups/${req.params.id}/unassign_contacts`);
  })
  .catch((err)=>{
    res.send(err);
  })
})

module.exports = router;
