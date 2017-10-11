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
  if(req.query.hasOwnProperty('error')) {
    error = 'Contact Name already used'
  }
  profiles.getDataProfiles().then((result)=>{
    res.render('profiles',{
      pesanError:error,
      dataJsonProfiles:result.rows,
      dataContacts:result.rowsContact});
  })
});

//TAMBAH DATA
router.post('/', (req, res)=> {
  profiles.insertDataProfiles(req.body).then(()=>{
    res.redirect('/profiles')
  }).catch((err)=>{
    res.redirect('/profiles?error=true')
  })
});

//AMBIL EDIT
router.get('/edit/:id', (req, res) => {
  profiles.editDataProfiles(req.params.id).then((result)=>{
    res.render('editProfiles',{dataContacts:result.rowContact, dataJsonProfiles:result.rowProfile});
  })
});

//HASIL EDIT
router.post('/edit/:id', (req, res) => {
  profiles.hasilEditProfiles(req.params.id, req.body).then(()=>{
    res.redirect('../../profiles');
  })
});

//HAPUS DATA
router.get('/delete/:id', (req, res) => {
  profiles.hapusProfile(req.params.id).then(()=>{
    res.redirect('../../profiles');
  })
});

module.exports = router;