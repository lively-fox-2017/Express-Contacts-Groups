const express = require('express');
const router = express.Router();
let AddressContacts = require('../models/AddresseswithContacts')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db');


//TAMBAHAN ADDRESS WITH CONTACTS
router.get('/', (req, res) => { 
   AddressContacts.getAddressContacts().then((result)=>{
     console.log()
      res.render('addresses_with_contact',{dataJsonAddresses:result.rows, dataJsonContacts:result.rowsContact});
    })
});

//TAMBAH DATA ADDRESS WITH CONTACTS
router.post('/', (req, res)=> {
  AddressContacts.addAddressesContacts(req.body).then(()=>{
    res.redirect('addresses_with_contact');
  })
});

//AMBIL DATA ADDRESS WITH CONTACTS
router.get('/edit/:id', (req, res) => {
  AddressContacts.getIdAddressContacts(req.params.id).then((result)=>{
    res.render('editAddresses_with_contact',{dataJsonAddresses:result.rows, NamaContacts:result.rowsContact});
  })
});

//HASIL EDIT DATA ADDRESS WITH CONTACTS
router.post('/edit/:id', (req, res) => {
  AddressContacts.processEditDataAddressContacts(req.params.id, req.body).then(()=>{
    res.redirect('../../addresses_with_contact');
  })
});

//HAPUS DATA ADDRESS WITH CONTACTS
router.get('/delete/:id', (req, res) => {
  AddressContacts.deleteAddressesContacts(req.params.id).then(()=>{
    res.redirect('../../addresses_with_contact');
  })
});


module.exports = router;