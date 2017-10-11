let express = require('express');
const router = express.Router();

let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('data.db');

let Profiles = require('../models/Profiles')
let profiles = new Profiles();
//Profile -------

//DATA Profile
function getContactsTable() {
  // db.all('SELECT * from Contacts',(err, rowsContact)=>{
  //   // res.send(rows)
  //   res.render('profiles',{dataJsonProfiles:rows,NamaContacts:rowsContact});
  //   console.log(rows);
  // });
}
router.get('/', (req, res) => {
  let error = ''
  // console.log("=======",req.query) 

  if(req.query.hasOwnProperty('error')) {
    // console.log("=======",req.query)
    error = 'Contact Name already used'
  }
  profiles.getDataProfiles((rows, rowsContact) => {
    res.render('profiles',{pesanError:error,dataJsonProfiles:rows,dataContacts:rowsContact});
  })
});

//TAMBAH DATA
router.post('/', (req, res)=> {
  profiles.insertDataProfiles(req.body,(err)=>{
    if(err) {
      res.redirect('/profiles?error=true')
    } else {
      res.redirect('/profiles')
    }
  });
});

//AMBIL EDIT
router.get('/edit/:id', (req, res) => {
  profiles.editDataProfiles(req.params.id, (rowProfile, rowContact)=>{
    res.render('editProfiles',{dataContacts:rowContact, dataJsonProfiles:rowProfile});
  });
});

//HASIL EDIT
router.post('/edit/:id', (req, res) => {
  profiles.hasilEditProfiles(req.params.id, req.body,(data, err)=>{
    if(!err){
      res.redirect('../../profiles');
    }

  })
});

//HAPUS DATA
router.get('/delete/:id', (req, res) => {
  profiles.hapusProfile(req.params.id,(err, data)=>{
      if(!err){
        console.log('data '+data)
          res.redirect('../../profiles');
      } else {
        console.log('error '+err);
      }
  });
});



module.exports = router;