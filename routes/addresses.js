const express = require('express')
const router = express.Router();
const modelsAddresses = require('../models/addresses')
const modelsContacts = require('../models/contacts')


//addresses
router.get('/', (req, res) => {
  //masih kurang join
  modelsAddresses.findAll((err,dataAddress)=>{
    modelsAddresses.findContact(dataAddress,(data)=>{
      modelsContacts.findAll((err,dataContacts)=>{
        if (!err) {
          // res.send(data)
          res.render('addresses',{data:data,dataContacts:dataContacts})
        } else {
          res.send(err)
        }
      })
    })
  });
})

router.post('/', (req, res) => {
  modelsAddresses.insertData(req.body,(err)=>{
    if (!err) {
      res.redirect('/addresses');
    } else {
      res.send(err)
    }
  });
})

router.get('/delete/:id', (req, res) => {
  modelsAddresses.deleteData(req.params,(err)=>{
    if (!err) {
      res.redirect('/addresses');
    } else {
      res.send(err)
    }
  });
})
router.get('/edit/:id', (req, res) => {
  modelsAddresses.findById(req.params.id,(err,data)=>{
    modelsContacts.findAll((err,dataContacts)=>{
      if (!err) {
        // res.send(data)
        res.render('addresses_edit',{data:data,dataContacts:dataContacts});
      } else {
        res.send(err)
      }
    })
  });
})
router.post('/edit/:id', (req, res) => {
  modelsAddresses.updateData(req.body,req.params,(err)=>{
    if (!err) {
      res.redirect('/addresses');
    } else {
      res.send(err)
    }
  });
})

module.exports = router;
