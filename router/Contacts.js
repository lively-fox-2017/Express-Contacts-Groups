let express = require('express');
const router = express.Router();

let Contacts = require('../models/Contacts');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

//DATA KONTAK
router.get('/', (req, res) => {
  Contacts.getContacts((err, dataContacts)=>{
    if(!err){
      res.render('contacts',{dataJsonContact:dataContacts});
    } else {
      console.log(err);
    }
  })
});

//TAMBAH DATA
router.post('/', (req, res) => {
  Contacts.addContacts(req.body,(err, dataContact)=>{
    if(!err){res.redirect('contacts');} else { console.log(err);}
  })
  
});

//AMBIL EDIT
router.get('/edit/:id', (req, res) => {
  Contacts.getIdContacts(req.params.id, (err, dataId)=>{
    if(!err){res.render('editContact',{dataJsonContact:dataId});} else {console.log(err);}
  })
});

//HASIL EDIT
router.post('/edit/:id', (req, res) => {
  Contacts.processEditContacts(req.params.id, req.body, (err, dataContacts)=>{
    if(!err){res.redirect('../../contacts');} else {console.log(err);}
  })
});

//HAPUS DATA
router.get('/delete/:id', (req, res) => {
   Contacts.deleteContacts(req.params.id, (err, dataContacts)=>{
     if(!err){res.redirect('../../contacts')}else{console.log(err)};
   })
});

module.exports = router;