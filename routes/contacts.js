const express = require('express')
const router = express.Router()
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('data.db');
const Select = require('../models/contactsModel')


router.get('/', (req, res) => {

  Select.getAllContact((contacts, groups, err) => {
    if(err){
      console.log('gagal guys')
    }else{
      res.render('pages/index', {temp : contacts, temp1 : groups})
    }
  })
})

router.post('/', (req, res) => {

  Select.insertContact(req.body.name, req.body.company, req.body.telp, req.body.email, req.body.name_of_group, err =>{
    if(!err){
      res.redirect('/')
    }
  })

})

router.get('/deleteContact/:id', (req, res) => {

  Select.deleteContact(req.params.id, err =>{
    if(!err){
      res.redirect('/')
    }
  })
})

router.get('/editContact/:id', (req, res) => {

  Select.getContact(req.params.id, (err, contact) =>{
    if(!err){
      res.render('pages/editContact',{temp : contact})
    }
  })
});


router.post('/editContactFinal', (req, res) => {
  
  Select.updateContact(req.body.name, req.body.company, req.body.telp_number, req.body.email, req.body.id, (err, contact) =>{
    if(err){
      console.log('gagal guys')
    }else{
      res.redirect('/')
    }
  })
})

module.exports = router