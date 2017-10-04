const express = require('express')
const router = express.Router();
const modelsAddresses = require('../models/addresses')
const modelsContacts = require('../models/contacts')

//addresses
router.get('/', (req, res) => {
  modelsAddresses.findAll()
  .then((dataAddress)=>{
    modelsAddresses.findContact(dataAddress)
    .then((data)=>{
      modelsContacts.findAll()
      .then((dataContacts)=>{
        res.render('addresses',{data:data,dataContacts:dataContacts})
      })
    })
  })
  .catch(err=>{
    res.send(err);
  })
})

router.post('/', (req, res) => {
  modelsAddresses.insertData(req.body)
  .then((result)=>{
      res.redirect('/addresses');
  })
  .catch((err)=>{
      res.send(err)
  });
})

router.get('/delete/:id', (req, res) => {
  modelsAddresses.deleteData(req.params)
  .then((result)=>{
    res.redirect('/addresses');
  })
  .catch((err)=>{
    res.send(err)
  })
})
router.get('/edit/:id', (req, res) => {
  modelsAddresses.findById(req.params.id)
  .then((data)=>{
    modelsContacts.findAll()
    .then((dataContacts)=>{
      res.render('addresses_edit',{data:data,dataContacts:dataContacts});
    })
  })
  .catch((err)=>{
    res.send(err)
  })
})
router.post('/edit/:id', (req, res) => {
  modelsAddresses.updateData(req.body,req.params)
  .then((result)=>{
    res.redirect('/addresses');
  })
  .catch((err)=>{
    res.send(err)
  })
})

module.exports = router;
