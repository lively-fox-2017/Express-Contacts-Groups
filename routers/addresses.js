const express = require('express')
const router = express.Router()
const Contact = require('../Models/contacts')

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/data.db');
let query3 = `SELECT Addresses.*, Contacts.name, Contacts.id as contactsId FROM Addresses LEFT JOIN Contacts ON Contacts.id = Addresses.ContactsID`

router.get('/', function(req, res){
  router.get(`SELECT * FROM addresses WHERE ContactsID = ${req.params.id}`, (err,dataAddresses)=>{
    router.get(query3, (err,dataContact)=>{
      console.log(dataContact);
      if(err){
        console.log(err);
      }else{
        res.render('viewAddresses', {data:dataAddresses, dataContact:dataContact})
      }
    })
  })
})

//
// app.get('/contacts/viewAddresses/:id', function(req, res) {
//   db.all(`SELECT * FROM addresses WHERE ContactsID = ${req.params.id}`, function(err, row){
//     db.all(query3, (err,dataContact)=>{
//       if(err){
//         console.log(err)
//       }else{
//         console.log(dataContact)
//       res.render('viewAddresses', {row:row, dataContact:dataContact})
//       }
//     })
//   })
// })


module.exports = router
