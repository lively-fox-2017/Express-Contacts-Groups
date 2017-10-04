const express=require('express')
const router=express.Router()
var sqlite3= require ('sqlite3');
var db=new sqlite3.Database('./db/database.db')
const model=require('../models/contact')

router.get('/',(req,res)=>{
  model.findAll()
  .then(dataContact=>{
    // console.log('masuk');
    res.render('contact',{dataContact:dataContact})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/addcontact',(req,res)=>{
  model.findAll()
  .then(dataContact=>{
    // console.log('masuk');
    // res.send(contact)
    res.render('addcontact',{dataContact:dataContact})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/addcontact',(req,res)=>{
  model.postInsert(req)
  // console.log('sampe ')
    .then(dataContact=>{
      //disiini dy ngrequest data
      // console.log('sampe2');
      res.redirect('/contact')
      // console.log();
    })
    .catch (err=>{
      res.send(err)
    })
})

router.get('/edit/:id',(req,res)=>{
  model.getEdit(req)
  .then(dataContact=>{
    // console.log('masuk');
    res.render('editcontact',{dataContact:dataContact[0]})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/edit/:id',(req,res)=>{
  model.postEdit(req)
    .then(dataContact=>{
    })
      res.redirect('/contact')
      console.log('sampe ')
    .catch (err=>{
      res.send(err)
    })
})
module.exports = router;
    //disiini dy ngrequest data
    // console.log('sampe2');
    // console.log();
