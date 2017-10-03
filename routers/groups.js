const express = require('express');
const router = express.Router();
const Contact = require('../models/contact.js');
const Group = require('../models/group.js');
const Contact_Groups = require('../models/contact_groups.js')

router.get('/', function(req, res) {
  function jalan(cb) {
    Group.findAll(function(err, groupRows) {
      groupRows.forEach((group, index) => {
        group['name'] = "";
        Contact_Groups.findBy(group.id, 'Group_ID', function(err, rows) {
          var contact_id = rows.map((row) => {
            return row.Contact_ID
          });
          if (contact_id.length == 0) {
            contact_id.push('null');
            contact_id.push('null');
            contact_id.push('null');
            contact_id.push('null');
            contact_id.push('null');
            contact_id.push('null');
          }
          contact_id.forEach((contact, index2) => {
            Contact.findById(contact, function(err, rows) {
              if (rows !== undefined) {
                group['name'] += rows.name + ", ";
              }
              if (index >= groupRows.length - 1 && index2 >= contact_id.length - 1) {
                cb(groupRows);
              }
            })
          })
        })
      })
    })
  }
  jalan(function(groupRows){
    res.render('groups', {dataRows:groupRows, message:""+req.query.message})
  })
});

router.post('/', function(req, res) {
  Group.insertData(req.body, function(err) {
    if (err != null) {
      res.redirect('groups?message=' + err)
    } else {
      res.redirect('groups?message=success')
    }
  })
})

router.get('/assign/:id', function(req, res){
  Contact.findAll(function(err, rows){
    Group.findById(req.param('id'), function(err2, rows2){
      console.log(rows2);
      res.render('assign-group', {contactsRows:rows, groupRows:rows2});
    });
  });
});

router.post('/assign/:id', function(req, res){
  var data = {
    Contact_ID: req.body.contact_id,
    Group_ID: req.param('id'),
  }
  Contact_Groups.insertData(data, function(err){
    res.redirect('../../groups?message='+err);
  })
})

router.get('/edit/:id', function(req, res){
  Group.findById(req.param('id'), function(err, rows){
    res.render('groups_edit', {dataRows:rows});
  })
})

router.post('/edit/:id', function(req, res){
  var data = {
    id: req.param('id'),
    name_of_group:req.body.name_of_group
  }
  Group.editData(data, function(err){
    res.redirect('../../groups?message='+err);
  })
})

router.get('/delete/:id', function(req, res){
  Group.deleteData(req.param('id'), function(err){
    res.redirect('../../groups?message='+err);
  })
})

module.exports = router;
