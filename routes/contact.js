const express=require('express')
const router=express.Router()
var sqlite3= require ('sqlite3');
var db=new sqlite3.Database('./db/database.db')
const model=require('../models/contact')


router.get('/',(req,res)=>{
  model.getAll((row)=>{
    res.render('contact',{data:row})
  })//
})
// })
router.post('/',(req,res)=>{
  model.insertContact(req.body)
    res.redirect('/contact')
})
router.get('/addressview/:id/',(req,res)=>{
  db.all(`SELECT * FROM Addresses LEFT JOIN Contacts ON
    Addresses.idContacts=Contacts.id`,(err,rowAdressview)=>{
    db.all("SELECT * FROM Contacts",(err,rowContactview)=>{
      res.render('addressview',{dataAddress:rowAdressview,dataContacts:rowContactview})
      // res.send('rowAdress')
    })
  })
})
router.get('/delete/:id/',(req,res)=>{
  model.deleteContact(req.params)
    res.redirect('/contact')
  })

router.get('/edit/:id',(req,res)=>{
  model.getInsertContact(req.params.id,(row)=>{
    res.render('contactedit',{data:row})
  })
})

router.post('/edit/:id',(req,res)=>{
  model.postInsertContact(req.body,req.params.id,(err)=>{
    if (err) {
      res.send(err)
    }
    res.redirect('/contact')
  })
})
  // res.send('coba')
  // name,company,telp_number,email
// ,()=>{
      // company,telp_numbers sesuai dengan database
      //req.body sesuai dengan ejs name nya apa
    // res.redirect('/')
// })
//
// router.get('/contactedit',(req,res)=>{
//   db.all(`SELECT * FROM Contacts WHERE id=${req.params.id}`,(err,row)=>{
//     res.render('contactedit',{data:row})
//   })
// })
module.exports = router;
