const express = require('express');
const router = express.Router();
let AddressContacts = require('../models/AddresseswithContacts')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db');


//TAMBAHAN ADDRESS WITH CONTACTS
router.get('/', (req, res) => { // Id	Street	City	ZIP code	Contact Name	Company	Telp Number	Email	Actions
    AddressContacts.AddressContacts((rows, dataAddressContacts)=>{
      if(!err){res.render('addresses_with_contact',{dataJsonAddresses:rows, dataJsonContacts:dataAddressContacts});}
    })
});

//TAMBAH DATA ADDRESS WITH CONTACTS
router.post('/', (req, res)=> {
  AddressContacts.addAddressesContacts(req.body,(err, data)=>{
    if(!err){res.redirect('addresses_with_contact');}else{console.log(err)}
  })
});

//AMBIL DATA ADDRESS WITH CONTACTS
router.get('/edit/:id', (req, res) => {
  AddressContacts.getIdAddressContacts(req.params.id, (err, dataAddresses, dataContacts)=>{
    if(!err){
    res.render('editAddresses_with_contact',{dataJsonAddresses:dataAddresses, NamaContacts:dataContacts});
    } else {
      console.log(err);
    }
  })
});

//HASIL EDIT DATA ADDRESS WITH CONTACTS
router.post('/edit/:id', (req, res) => {
  AddressContacts.processEditDataAddressContacts(req.params.id, req.body,(err, dataAddressContacts)=>{
    if(!err){
      res.redirect('../../addresses_with_contact');
    } else {
      console.log(err);
    }
  })
});

//HAPUS DATA ADDRESS WITH CONTACTS
router.get('/delete/:id', (req, res) => {
  AddressContacts.deleteAddressesContacts(req.params.id,(err, dataDelete)=>{
    if(!err){
      res.redirect('../../addresses_with_contact');
    } else {
      console.log(err);
    }
  })
});


module.exports = router;