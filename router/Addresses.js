let express = require('express');
const router = express.Router();
let Addresses = require('../models/Addresses')

//Addresses -------

//DATA addresses
router.get('/', (req, res) => {
  Addresses.getAddresses((rows, rowsContact)=>{
    res.render('addresses',{dataJsonAddresses:rows, dataJsonContacts:rowsContact});
  });
});
//TAMBAH DATA
router.post('/', (req, res)=> {
  Addresses.createAddresses(req.body, (err) =>{
    if(!err){
      res.redirect('addresses');
    }
  })

});

//AMBIL EDIT
router.get('/edit/:id', (req, res) => {
  Addresses.getAddressesId(req.params.id, (rowsAddress, rowsContact)=>{
    res.render('editAddresses',{dataJsonAddresses:rowsAddress, NamaContacts:rowsContact});
  })
});

//HASIL EDIT
router.post('/edit/:id', (req, res) => {
  // UPDATE table-name SET column-name = value, column-name = value,WHERE condition
  Addresses.processEditAddresses(req.params.id, req.body, (err, data)=>{
    if(!err){
      res.redirect('../../addresses');
    } else {
      console.log(err);
    }
  })
});

//HAPUS DATA
router.get('/delete/:id', (req, res) => {
  Addresses.deleteAddresess(req.params.id, (err, dataAddresses)=>{
    if(!err){
      res.redirect('../../addresses');
    } else {
      console.log(err);
    }
  })
});


module.exports = router;