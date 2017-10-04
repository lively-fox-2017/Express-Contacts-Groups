let express = require('express');
const router = express.Router();

let Groups = require('../models/Groups');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

//GROUPS -------

//DATA GRUP
router.get('/', (req, res) => {
  Groups.getAllGroups().then((dataGroups)=>{
    res.render('groups',{dataJsonGroups:dataGroups});
  })
});
//TAMBAH DATA
router.post('/', (req, res) => {
  Groups.addGroups(req.body).then(()=>{
    res.redirect('groups');
  })
});

//AMBIL EDIT
router.get('/edit/:id', (req, res) => {
  Groups.getIdGroups(req.params.id).then((dataGroups)=>{
    res.render('editGroups',{dataJsonGroups:dataGroups});
  })
});

//HASIL EDIT
router.post('/edit/:id', (req, res) => {
  Groups.processEditGroups(req.params.id, req.body).then(()=>{
    res.redirect('../../groups');
  })
});

//HAPUS DATA
router.get('/delete/:id', (req, res) => {
  Groups.deleteGroups(req.params.id).then(()=>{
    res.redirect('../../groups');
  })
});

module.exports = router;