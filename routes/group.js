const express=require('express')
const router=express.Router()
var sqlite3= require ('sqlite3');
var db=new sqlite3.Database('./db/database.db')
const model=require('../models/group')

router.get('/',(req,res)=>{
  model.findAll()
  .then(dataGroup=>{
    // console.log('masuk');
    res.render('group',{dataGroup:dataGroup})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/addgroup',(req,res)=>{
  model.findAll()
  .then(dataGroup=>{
    // console.log('masuk');
    // res.send(group)
    res.render('addgroup',{dataGroup:dataGroup})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/addgroup',(req,res)=>{
  model.postInsert(req)
  // console.log('sampe ')
    .then(dataGroup=>{
      //disiini dy ngrequest data
      // console.log('sampe2');
      res.redirect('/group')
      // console.log();
    })
    .catch (err=>{
      res.send(err)
    })
})

router.get('/edit/:id',(req,res)=>{
  model.getEdit(req)
  .then(dataGroup=>{
    // console.log('masuk');
    res.render('editgroup',{dataGroup:dataGroup[0]})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/edit/:id',(req,res)=>{
  model.postEdit(req)
    .then(dataGroup=>{
    })
      res.redirect('/group')
      console.log('sampe ')
    .catch (err=>{
      res.send(err)
    })
})
module.exports = router;
    //disiini dy ngrequest data
    // console.log('sampe2');
    // console.log();
