const express = require('express')
const router = express.Router()
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('data.db');
const Select = require('../models/contactsModel')


router.get('/', (req, res) => {
  Select.getAllContact().then((result) =>{
    //res.send(result)
    res.render('pages/index', {temp : result.tempValues, temp1 : result.tempValues2})
  })
})

router.post('/', (req, res) => {

  Select.insertContact(req.body.name, req.body.company, req.body.telp, req.body.email, req.body.name_of_group).then(res.redirect('/'))
})

router.get('/deleteContact/:id', (req, res) => {

  Select.deleteContact(req.params.id).then(res.redirect('/'))
})

router.get('/editContact/:id', (req, res) => {

  Select.getContactById(req.params.id).then(contact =>{
    res.render('pages/editContact', {temp : contact})
  })
});


router.post('/editContactFinal', (req, res) => {
    Select.updateContact(req.body.name, req.body.company, req.body.telp_number, req.body.email, req.body.id).then(res.redirect('/'))
})

module.exports = router