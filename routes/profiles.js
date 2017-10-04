const express = require('express')
const router = express.Router();
const modelsProfiles = require('../models/profiles')
const modelsContacts = require('../models/contacts')

//profiles
router.get('/', (req, res) => {
  // masih kurang join
  modelsProfiles.findAll()
  .then((dataProfile)=>{
    modelsProfiles.findContact(dataProfile)
    .then((data)=>{
      modelsContacts.findAll()
      .then((dataContacts)=>{
          res.render('profiles',{data:data,dataContacts:dataContacts,sendError:''})
          // res.send(dataContacts);
      })
    })
  })
  .catch((err)=>{
    res.send(err)
  })
})

router.post('/', (req, res) => {
  modelsProfiles.findBy('contactId='+req.body.contactId)
  .then((data)=>{
    if (data.length==0) {
      modelsProfiles.insertData(req.body)
      .then((result)=>{
        res.redirect('/profiles');
      })
    } else {
      modelsProfiles.findAll()
      .then((dataProfile)=>{
        modelsProfiles.findContact(dataProfile)
        .then((data)=>{
          modelsContacts.findAll()
          .then((dataContacts)=>{
            res.render('profiles',{data:data,dataContacts:dataContacts,sendError:'Contact Id sudah dipakai! Silahkan ganti Contact Id yang lain'})
          })
        })
      })
    }
  })
  .catch((err)=>{
    res.send(err);
  })
})
router.get('/delete/:id', (req, res) => {
  modelsProfiles.deleteData(req.params)
  .then((result)=>{
      res.redirect('/profiles');
  })
  .catch((err)=>{
    res.send(err)
  })
})
router.get('/edit/:id', (req, res) => {
  modelsProfiles.findById(req.params.id)
  .then((data)=>{
    modelsContacts.findAll()
    .then((dataContacts)=>{
      res.render('profiles_edit',{data:data,dataContacts:dataContacts,sendError:''});
    })
  })
  .catch((err)=>{
    res.send(err);
  })
})
router.post('/edit/:id', (req, res) => {
  modelsProfiles.findBy(`contactId NOT IN (SELECT contactId FROM PROFILES WHERE id=${req.params.id}) AND contactId=${req.body.contactId}`)
  .then((data)=>{
    if (data.length==0) {
      modelsProfiles.updateData(req.body,req.params)
      .then((result)=>{
        res.redirect('/profiles');
      });
    } else {
      modelsProfiles.findById(req.params.id)
      .then((data)=>{
        modelsContacts.findAll()
        .then((dataContacts)=>{
          res.render('profiles_edit',{data:data,dataContacts:dataContacts,sendError:'Contact Id sudah dipakai! Silahkan ganti Contact Id yang lain'});
        })
      })
    }
  })
  .catch((err)=>{
    res.send(err)
  })
})

module.exports = router;
