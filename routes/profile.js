const express=require('express')
const router=express.Router()
var sqlite3= require ('sqlite3');
var db=new sqlite3.Database('./db/database.db')
const profile=require('../models/profile')
const contact=require('../models/contact')

router.get('/',(req,res)=>{
  profile.findAll()
  .then(dataProfile=>{
    contact.findAll()
    .then(dataContact=>{
      for (var i = 0; i < dataProfile.length; i++) {
        for (var j = 0; j < dataContact.length; j++) {
          if(dataContact[j].id ==dataProfile[i].Contactsid){
            dataProfile[i].name= dataContact[j].name
          }
        }
      }
      res.render('profile',{dataProfile:dataProfile,dataContact:dataContact})
    })
    // console.log('masuk');
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/addprofile',(req,res)=>{
  profile.findAll()
  .then(dataProfile=>{
    contact.findAll()
    .then(dataContact=>{
      res.render('addprofile',{dataProfile:dataProfile,dataContact:dataContact,dataError:null})
    })
  })
  .catch(err=>{
    res.send(dataError)
  })
})
    // console.log('masuk');
    // res.send(profile)

router.post('/addprofile',(req,res)=>{
  profile.postInsert(req)
  // console.log('sampe ')
    .then(dataProfile=>{
      res.redirect('/profile')
    })
    .catch (err=>{
      if(err){
        if(err.code == 'SQLITE CONSTRAINT'){
          profile.findAll()
          .then (profile=>{
            contact.findAll()
            .then(contact=>{
              res.render('addprofile',{dataProfile:dataProfile,dataContact:dataContact,dataError:'Id id id'})
            })
          })
        }
      }
    })
})
      //disiini dy ngrequest data
      // console.log('sampe2');
      // console.log();
router.get('/edit/:id',(req,res)=>{
  profile.getEdit(req)
  .then(dataProfile=>{
    contact.findAll()
    .then(dataContact=>{
      res.render('editprofile',{dataProfile:dataProfile[0],dataContact:dataContact,dataError:null})
    })
  })
  .catch(err=>{
    res.send(err)
  })
})
    // console.log('masuk');
router.post('/edit/:id',(req,res)=>{
  profile.postEdit(req)
    .then(dataProfile=>{
      res.redirect('/profile')
      // contact.findAll()
      // .then(dataContact=>{
      })
      .catch (err=>{
        if(err){
          if(err.code==='SQLITE CONSTRAINT'){
            profile.findAll()
            .then(dataProfile=>{
              contact.findall()
              .then(dataContact=>{
                res.render('editprofile',{dataProfile:dataProfile[0],dataContact:dataContact,dataError:"idididi"})
              })
            })
          }
        }
      })
    })
  //   // res.send(err)
// })
// // })

      // console.log('sampe ')
module.exports = router;
    //disiini dy ngrequest data
    // console.log('sampe2');
    // console.log();
