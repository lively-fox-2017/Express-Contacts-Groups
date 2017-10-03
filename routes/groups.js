const express = require('express')
const router = express.Router();
const modelsGroups = require('../models/groups')
const modelsContactsGroups = require('../models/contactsGroups')
const modelsContacts = require('../models/contacts')

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/database.db');

//groups
router.get('/', (req, res) => {
  modelsGroups.findAll((err,data)=>{
    modelsContactsGroups.findAll((err,dataMembers)=>{
      if (!err) {
        let newData=data.map(rows=>{
          rows["members"]=[];
          for (var i = 0; i < dataMembers.length; i++) {
            // console.log(rows.id,'==',dataMembers[i].groupId);
            if (rows.id==dataMembers[i].groupId) {
              rows.members.push(dataMembers[i].name)
            }
          }
          return rows
        })
        res.render('groups',{data:newData})
      } else {
        res.send(err)
      }
    })
  });
})
router.post('/', (req, res) => {
  modelsGroups.insertData(req.body,(err,result)=>{
    if (!err) {
      res.redirect('/groups');
    } else {
      res.send(err)
    }
  });
})
router.get('/delete/:id', (req, res) => {
  // db.run(`DELETE FROM groups WHERE id=${req.params.id}`,(err)=>{
  //   if (!err) {
  //     res.redirect('/groups');
  //   } else {
  //     res.send(err)
  //   }
  // });
  modelsGroups.deleteData(req.params,(err)=>{
    if (!err) {
      res.redirect('/groups');
    } else {
      res.send(err)
    }
  });
})
router.get('/edit/:id', (req, res) => {
  modelsGroups.findById(req.params.id,(err,data)=>{
    if (!err) {
      // res.send(data)
      res.render('groups_edit',{data:data});
    } else {
      res.send(err)
    }
  });
})
router.post('/edit/:id', (req, res) => {
  modelsGroups.updateData(req.body,req.params,(err)=>{
    if (!err) {
      res.redirect('/groups');
    } else {
      res.send(err)
    }
  });
})

router.get('/:id/assign_contacts', (req, res) => {
  modelsGroups.findById(req.params.id,(err,data)=>{
    modelsContacts.findAll((err,dataContacts)=>{
      if (!err) {
        // console.log(data);
        res.render('assign_contacts',{data:data,dataContacts:dataContacts})
        // res.send(data);
      } else {
        res.send(err)
      }
    })
  });
})

router.post('/:id/assign_contacts', (req, res) => {
  req.body["groupId"]=req.params.id;
  modelsContactsGroups.insertData(req.body,(err)=>{
    if (!err) {
      res.redirect(`/groups`);
    } else {
      res.send(err)
    }
  });
})

router.get('/:id/unassign_contacts', (req, res) => {
  modelsGroups.findById(req.params.id,(err,data)=>{
    modelsContactsGroups.findByGroupId(req.params.id,(err,dataMembers)=>{
      if (!err) {
        // console.log(data);
        res.render('unassign_contacts',{data:data,dataMembers:dataMembers})
        // res.send(data);
      } else {
        res.send(err)
      }
    })
  });
})

router.get('/:id/unassign_contact/:ContactGroupId', (req, res) => {
  modelsContactsGroups.deleteData(req.params,function(err,result){
    if (!err) {
      res.redirect(`/groups/${req.params.id}/unassign_contacts`);
    } else {
      res.send(err)
    }
  });
})

module.exports = router;
