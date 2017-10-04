const express=require('express')
const router=express.Router()
var sqlite3= require ('sqlite3');
var db=new sqlite3.Database('./db/database.db')
const address=require('../models/address')
const contact=require('../models/contact')


router.get('/',(req,res)=>{
  address.findAll()
  .then(dataAddress=>{
    contact.findAll()
    .then(dataContact=>{
      for (var i = 0; i < dataAddress.length; i++) {
        for(var j=0;j<dataContact.length;j++){
          if(dataContact[j].id== dataAddress[i].idContacts){
            dataAddress[i].name = dataContact[j].name
          }
        }
      }
      res.render('address',{dataAddress:dataAddress,dataContact:dataContact})

    })
    // console.log('masuk');
    .catch(err=>{
      res.send(err)
  })
  })
})

router.get('/addaddress',(req,res)=>{
  address.findAll()
  .then(dataAddress=>{
    contact.findAll()
    .then(dataContact=>{
      res.render('addaddress',{dataAddress:dataAddress,dataContact:dataContact,dataError:null})
    })
  })
  .catch(err=>{
    res.send(err)
  })
})
    // console.log('masuk');
    // res.send(address)

router.post('/addaddress',(req,res)=>{
  address.postInsert(req)
  .then(dataAddress=>{
    res.redirect('/address')
  })
  .catch (err=>{
    res.send(err)
  })
})
  // console.log('sampe ')
      //disiini dy ngrequest data
      // console.log('sampe2');
      // console.log();

router.get('/edit/:id',(req,res)=>{
  address.getEdit(req)
  .then(dataAddress=>{
    contact.findAll()
    .then(dataContact=>{
      res.render('editaddress',{dataAddress:dataAddress[0],dataContact:dataContact})
    })
  })
  .catch(err=>{
    res.send(err)
  })
})

    // console.log('masuk');

router.post('/edit/:id',(req,res)=>{
  address.postEdit(req)
    .then(dataAddress=>{
    })
      res.redirect('/address')
      console.log('sampe ')
    .catch (err=>{
      res.send(err)
    })
})
module.exports = router;
    //disiini dy ngrequest data
    // console.log('sampe2');
    // console.log();
