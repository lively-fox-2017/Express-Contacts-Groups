var express = require('express')
var router = express.Router();
const modelsContacts = require('../models/contacts')
const modelsGroups = require('../models/groups')
const modelsAddresses = require('../models/addresses')
const modelsContactsGroups = require('../models/contactsGroups')

router.get('/', (req, res) => {
  modelsContacts.findAll()
  .then((data)=>{
    modelsGroups.findAll()
    .then((dataGroups)=>{console.log('asdfas');
      // res.send(dataGroups)
      res.render('contacts',{data:data,dataGroups:dataGroups})
    })
  })
  .catch((err)=>{
    res.send(err);
  })
})

router.post('/', (req, res) => {
  modelsContacts.insertData(req.body)
  .then(function(result){
    let newData={"contactId":result.lastID,"groupId":req.body.groupId}
    modelsContactsGroups.insertData(newData)
    .then(function(result){
      // res.send(result)
      res.redirect('/contacts');
    })
  })
  .catch((err)=>{
    res.send(err);
  })
})
router.get('/delete/:id', (req, res) => {
  modelsContacts.deleteData(req.params)
  .then(function(result){
    res.redirect('/contacts');
  })
  .catch((err)=>{
    res.send(err)
  })
})
router.get('/edit/:id', (req, res) => {
  modelsContacts.findById(req.params.id)
  .then(function(data){
    res.render('contacts_edit',{data:data});
  })
  .catch((err)=>{
    res.send(err);
  })
})
router.post('/edit/:id', (req, res) => {
  modelsContacts.updateData(req.body,req.params)
  .then(function(result){
      res.redirect('/contacts');
  })
  .catch((err)=>{
    res.send(err);
  })
})

router.get('/:id/addresses', (req, res) => {
  modelsContacts.findById(req.params.id)
  .then(function(data){
    modelsAddresses.findBy('contactId='+req.params.id)
    .then(function(dataAddresses){
      // res.send(data)
      res.render('contact_addresses',{data:data,dataAddresses:dataAddresses})
    })
  })
  .catch((err)=>{
    res.send(err);
  })
})

router.post('/:id/addresses', (req, res) => {
  req.body["contactId"]=req.params.id
  modelsAddresses.insertData(req.body)
  .then(function(result){
      res.redirect(`/contacts/${req.params.id}/addresses`);
  })
  .catch((err)=>{
    res.send(err);
  })
})

module.exports = router;
