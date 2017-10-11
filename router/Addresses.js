let express = require('express');
const router = express.Router();
let Addresses = require('../models/Addresses')
let Contact = require('../models/Contacts')

//Addresses -------
//DATA addresses
router.get('/', (req, res) => {
  Addresses.getAddresses()
  .then((dataAddress)=>{
    // console.log("------",dataAddress)
    Contact.getContacts()
    .then((dataContact) => {
      res.render('addresses',{
        dataJsonAddresses:dataAddress,
         dataJsonContacts:dataContact
        });
    })
  })
});
//TAMBAH DATA
router.post('/', (req, res)=> {
  Addresses.createAddresses(req.body).then(()=>{
    res.redirect('addresses');
  })
});

//AMBIL EDIT
router.get('/edit/:id', (req, res) => {
  Addresses.getAddressesId(req.params.id).then((result)=>{
    res.render('editAddresses',{dataJsonAddresses:result.rowsAddress, NamaContacts:result.rowsContact});
  })
});

//HASIL EDIT
router.post('/edit/:id', (req, res) => {
  Addresses.processEditAddresses(req.params.id, req.body).then(()=>{
    res.redirect('../../addresses');
  })
});

//HAPUS DATA
router.get('/delete/:id', (req, res) => {
  Addresses.deleteAddresess(req.params.id).then(()=>{
    res.redirect('../../addresses');
  })
});


module.exports = router;