let express = require('express');
const router = express.Router();

let Groups = require('../models/Groups');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

//GROUPS -------

//DATA GRUP
router.get('/', (req, res) => {
  Groups.getAllGroups((err, dataGroups)=>{
    if(!err){res.render('groups',{dataJsonGroups:dataGroups});}else{console.log(err)};
  })
});
//TAMBAH DATA
router.post('/', (req, res) => {
  Groups.getAllGroups(req.body,(err)=>{
    if(!err){
      res.redirect('groups');
    } else {
      console.log(err);
    }
  })
});

//AMBIL EDIT
router.get('/edit/:id', (req, res) => {
  Groups.getIdGroups(req.params.id, (err, dataGroups)=>{
    if(!err){res.render('editGroups',{dataJsonGroups:dataGroups});}else{console.log(err)};
  })
});

//HASIL EDIT
router.post('/edit/:id', (req, res) => {
  Groups.processEditGroups(req.params.id, req.body,(err, data)=>{
    if(!err){res.redirect('../../groups');}else{console.log(err)}
  })
});

//HAPUS DATA
router.get('/delete/:id', (req, res) => {
  Groups.deleteGroups(req.params.id, (err, data)=>{
    if(!err){res.redirect('../../groups');}else{console.log(err)};
  })
});

module.exports = router;