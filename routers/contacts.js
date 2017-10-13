const express = require('express')
const router = express.Router()
const Contact = require('../Models/contacts')

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/data.db');

router.get('/', function(req,res){
  Contact.findAll()
  .then((row)=>{
    res.render('contacts', {data:row})
  })
})

router.get('/', function(req, res){
  Contact.findById().then((data)=>{
     res.render('editContacts',{data:data})
  })
})

router.post('/', function(req, res){
  Contact.create(req.body).then(()=>{
    res.redirect('contacts')
  })
})



router.get('/edit/:id', function(req, res){
  Contact.editById(req.params).then((data)=>{
    res.render('editContacts', {data:data})
  })
})

router.post('/edit/:id', function(req, res){
  Contact.updateCon(req.body, req.params).then((err)=>{
    if(!err){
      res.redirect('/contacts')
    }
  })
})

router.get('/delete/:id', function(req, res){
  Contact.deleteCon(req.params).then((err)=>{
    if(!err){
      res.redirect('/contacts')
    }
  })
})










module.exports = router;
