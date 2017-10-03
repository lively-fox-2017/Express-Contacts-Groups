const express = require('express')
const router = express.Router()
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('data.db');
const Models = require('../models/addressesModels')

router.get('/address', (req, res) => {

  Models.getAllAddresses((resultaddresses, contacts, err) =>{
    if(!err){
      res.render('pages/address', {temp : resultaddresses, temp1 : contacts})
    }
  })
})

router.get('/addressDetail/:id', (req, res) => {
  console.log(req.params.id)
  Models.getAddressesDetail(req.params.id, (address, contact, err) =>{
    console.log(address)
    if(!err){
      res.render('pages/address', {temp : address, temp1 : contact})
    }
  })
})

router.post('/address', (req, res) => {
      db.run('insert into addresses (street, city, zipcode, id_contact) values (?, ?, ?, ?);',(req.body.street), (req.body.city), (req.body.zipcode), (req.body.id_contact))
      res.redirect('/address')
})

router.get('/deleteAddresses/:id', (req, res) => {
      db.run('delete from addresses where id = (?);',(req.params.id)) 
      res.redirect('/address')
});

router.get('/editAddresses/:id', function(req, res) {
  
      db.all('select * from addresses where id = (?);',(req.params.id), (err, addresses) => {
        res.render('pages/editAddresses', {temp : addresses})
    }) 
})


router.post('/editAddressFinal', (req, res) => {
      db.run('update addresses set street = (?), city = (?), zipcode = (?) where id = (?);',(req.body.street), (req.body.city), (req.body.zipcode), (req.body.id))
      res.redirect('/address')
})

module.exports = router