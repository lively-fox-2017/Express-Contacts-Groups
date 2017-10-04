let express = require('express');
const router = express.Router();

let Contacts = require('../models/Contacts');
let Groups = require('../models/Groups')

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

//DATA KONTAK
router.get('/', (req, res) => {

  // var count = 0
  // rowAddress.forEach((row) => {
  //   //get contact by row.contact_id
  //   Contact.getIdContacts(row.ContactsId)
  //   .then((dataContact) => {
  //     row.contactName = dataContact.nama
  //     row.company = dataContact.company
  //     count++ 
  //     if(count == rowAddress.length) {
  //       resolve(rowAddress)
  //     }
  //   })
  // })

  Contacts.getContacts()
  .then((dataContacts)=>{
    console.log('----',dataContacts);
    Groups.getAllGroups()
    .then((dataGroups)=>{
      res.render('contacts',{
          dataJsonContact:dataContacts,
          dataJsonGroups:dataGroups
      });
    })
  })
});

//TAMBAH DATA
router.post('/', (req, res) => {
  Contacts.addContacts(req.body).then(()=>{
    res.redirect('contacts');
  })
});

//AMBIL EDIT
router.get('/edit/:id', (req, res) => {
  Contacts.getIdContacts(req.params.id).then((result)=>{
    res.render('editContact',{dataJsonContact:result});
  })
});

//HASIL EDIT
router.post('/edit/:id', (req, res) => {
  Contacts.processEditContacts(req.params.id, req.body).then(()=>{
    res.redirect('../../contacts');
  })
});

//HAPUS DATA
router.get('/delete/:id', (req, res) => {
   Contacts.deleteContacts(req.params.id).then(()=>{
    res.redirect('../../contacts');
   })
});

module.exports = router;