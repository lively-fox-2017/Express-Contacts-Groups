const express = require('express');
const router = express.Router();
const Contact = require('../models/contact.js');
const Group = require('../models/group.js');
const Contact_Groups = require('../models/contact_groups.js')
const Adresses = require('../models/adress.js');

router.get('/', function(req, res) {
  function jalan(cb) {
    Contact.findAll(function(err, contactRows) {
      contactRows.forEach((contact, index) => {
        contact['group'] = "";
        Contact_Groups.findBy(contact.id, 'Contact_ID', function(err, rows) {
          var group_id = rows.map((row) => {
            return row.Group_ID
          });
          group_id.forEach((group, index2) => {
            Group.findById(group, function(err, rows2) {
              if (rows2 !== undefined)
                contact['group'] += rows2.name_of_group + ", ";
              if (index == contactRows.length - 1 && index2 == group_id.length - 1) {
                Group.findAll(function(err, rows3) {
                  cb(contactRows, rows3);
                })
              }
            })
            // group.forEach((groupID, index3)=>{
            //   Group.findById(groupID[index3], function(err, rows2){
            //     contactRows['group'] = rows2;
            //   })
            //   if(index3 == groupID.length - 1){
            //     res.send(contactRows);
            //   }
            // })
          });
        });
      });
    });
  }
  jalan(function (contactRows, rows3){
    res.render('contacts', {
      dataRows: contactRows,
      groupRows: rows3,
      message:""+req.query.message
    })
  })
})

router.post('/', function(req, res) {
  var dataContact = {
    name:req.body.name,
    company:req.body.company,
    telp_number:req.body.telp_number,
    email:req.body.email
  }
  Contact.insertData(dataContact, function(err, lastID){
    if(err == null){
      var data = {
        Contact_ID:lastID,
        Group_ID:req.body.group_id
      }
      Contact_Groups.insertData(data, function(err2){
        if(err == null)
          res.redirect('contacts?message=success');
        else{
          res.redirect('contacts?message='+err2);
        }
      })
    }
    else {
      res.redirect('contacts?message='+err);
    }
  })
})

router.get('/edit/:id', function(req, res){
  Contact.findById(req.param('id'), function(err, rows){
    res.render('contacts_edit', {dataRows:rows});
  })
})

router.post('/edit/:id', function(req, res){
  req.body.id = req.param('id');
  Contact.editData(req.body, function(err){
    var message ="";
    if(err == null){
      message = "Success edit data";
    }
    else{
      message = "Gagal edit data";
    }
    res.redirect('../../contacts?message='+err);
  })
})

router.get('/delete/:id', function(req, res){
  Contact.deleteData(req.param('id'), function(err){
    if(err !== null) {
      res.redirect('../?message='+err);
    }
    else{
      res.redirect('../?message=success');
    }
  })
})

router.get('/adresses/:id', function(req, res){
  Contact.findById(req.param('id'), function(err, rows){
    Adresses.findBy(req.param('id'), 'Contact_ID', function(err2, rows2){
      console.log(rows);
      console.log(rows2);
      res.render('adresses_detail', {dataRows: rows, adressRows:rows2, message:req.query.message});
    })
  })
})

router.post('/adresses/:id', function(req, res){
  req.body.contact_id = req.param('id');
  Adresses.insertData(req.body, function(err){
    res.redirect('/contacts/adresses/'+req.param('id')+'?message='+err);
  })
})

module.exports = router;
