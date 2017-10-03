var express = require('express')
var router = express.Router();
const modelsContacts = require('../models/contacts')
const modelsGroups = require('../models/groups')
const modelsAddresses = require('../models/addresses')

router.get('/', (req, res) => {
  modelsContacts.findAll(function(err,data){
    modelsGroups.findAll(function(err,dataGroups){
      if (!err) {
        // res.send(dataGroups)
        res.render('contacts',{data:data,dataGroups:dataGroups})
      } else {
        res.send(err)
      }
    })
  })
})

router.post('/', (req, res) => {
  modelsContacts.insertData(req.body,function(err,result){
    if (!err) {
      res.redirect('/contacts');
    } else {
      res.send(err)
    }
  });
})
router.get('/delete/:id', (req, res) => {
  modelsContacts.deleteData(req.params,function(err,result){
    // console.log(err);
    if (!err) {
      console.log('---asdfs');
      res.redirect('/contacts');
    } else {
      res.send(err)
    }
  })
})
router.get('/edit/:id', (req, res) => {
  modelsContacts.findById(req.params.id,function(err,data){
    if (!err) {
      res.render('contacts_edit',{data:data});
    } else {
      res.send(err)
    }
  })
})
router.post('/edit/:id', (req, res) => {
  modelsContacts.updateData(req.body,req.params,function(err){
    if (!err) {
      res.redirect('/contacts');
    } else {
      res.send(err)
    }
  })
})

router.get('/:id/addresses', (req, res) => {
  modelsContacts.findById(req.params.id,function(err,data){
    modelsAddresses.findByField('contactId',req.params.id,function(err,dataAddresses){
      if (!err) {
        // res.send(data)
        res.render('contact_addresses',{data:data,dataAddresses:dataAddresses})
      } else {
        res.send(err)
      }
    });
  })
})

router.post('/:id/addresses', (req, res) => {
  req.body["contactId"]=req.params.id
  modelsAddresses.insertData(req.body,function(err,result){
    if (!err) {
      res.redirect(`/contacts/${req.params.id}/addresses`);
    } else {
      res.send(err)
    }
  });
})

module.exports = router;
