const express = require('express')
const router = express.Router();
const modelsProfiles = require('../models/profiles')
const modelsContacts = require('../models/contacts')

//profiles
router.get('/', (req, res) => {
  // masih kurang join
  modelsProfiles.findAll((err,dataProfile)=>{
    modelsProfiles.findContact(dataProfile,(data)=>{
      modelsContacts.findAll((err,dataContacts)=>{
        if (!err) {
          // res.send(data)
          res.render('profiles',{data:data,dataContacts:dataContacts,sendError:''})
          // res.send(dataContacts);
        } else {
          res.send(err)
        }
      })
    })
  });
})

router.post('/', (req, res) => {
  modelsProfiles.findBy('contactId='+req.body.contactId,(err,data)=>{
    if (data.length==0) {
      modelsProfiles.insertData(req.body,(err)=>{
        if (!err) {
          res.redirect('/profiles');
        } else {
          res.send(err)
        }
      });
    } else {
      modelsProfiles.findAll((err,data)=>{
        modelsContacts.findAll((err,dataContacts)=>{
          if (!err) {
            // masih kurang join
            res.render('profiles',{data:data,dataContacts:dataContacts,sendError:'Contact Id sudah dipakai! Silahkan ganti Contact Id yang lain'})
            // res.send(dataContacts);
          } else {
            res.send(err)
          }
        })
      });
    }
  })
})
router.get('/delete/:id', (req, res) => {
  modelsProfiles.deleteData(req.params,(err)=>{
    if (!err) {
      res.redirect('/profiles');
    } else {
      res.send(err)
    }
  });
})
router.get('/edit/:id', (req, res) => {
  modelsProfiles.findById(req.params.id,(err,data)=>{
    modelsContacts.findAll((err,dataContacts)=>{
      if (!err) {
        // res.send(data)
        res.render('profiles_edit',{data:data,dataContacts:dataContacts,sendError:''});
      } else {
        res.send(err)
      }
    })
  });
})
router.post('/edit/:id', (req, res) => {
  modelsProfiles.findBy(`contactId NOT IN (SELECT contactId FROM PROFILES WHERE id=${req.params.id}) AND  contactId=${req.body.contactId}`,(err,data)=>{
    // console.log(data.length);
    if (data.length==0) {
      modelsProfiles.updateData(req.body,req.params,(err)=>{
        if (!err) {
          res.redirect('/profiles');
        } else {
          res.send(err)
        }
      });
    } else {
      modelsProfiles.findById(req.params.id,(err,data)=>{
        modelsContacts.findAll((err,dataContacts)=>{
          if (!err) {
            // masih kurang join
            res.render('profiles_edit',{data:data,dataContacts:dataContacts,sendError:'Contact Id sudah dipakai! Silahkan ganti Contact Id yang lain'});
          } else {
            res.send(err)
          }
        })
      });
    }
  })
})

module.exports = router;
