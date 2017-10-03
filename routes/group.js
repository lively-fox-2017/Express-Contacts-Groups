const express=require('express')
const router = express.Router()
var sqlite3= require ('sqlite3');
var db=new sqlite3.Database('./db/database.db')
const model=require('../models/group')

//========================groups======================
router.get('/',(req,res)=>{
  model.findAll((row)=>{
    res.render('group',{data:row})
  })
})

router.post('/',(req,res)=>{
  model.insertDataGroup(req.body)
    res.redirect('/group')

})
//=====delete Group id====
router.get('/delete/:id/',(req,res)=>{
  model.deleteDataGroup(req.params)
    res.redirect('/group')
  })

//=======edit Group=======
router.get('/edit/:id',(req,res)=>{
  model.getEditGroup(req.params.id,(row)=>{
    res.render('groupedit',{data:row})
  })
})
// })

router.post('/edit/:id',function(req,res){
  model.updateEditGroup(req.body,req.params.id,()=>{
    res.redirect('/group')
  })
})
  // db.run(`update Groups set name_of_group='${req.body.name_of_group}'
  //  WHERE id= ${req.params.id}`,function(){
// })
// router.get('/groupedit',(req,res)=>{
//   db.all(`SELECT * FROM Groups WHERE id=${req.params.id}`,(err,row)=>{
//     res.render('groupedit',{data:row})
//   })
// })

module.exports = router;
//========================groups======================
// app.get('/group',(req,res)=>{
//   db.all("SELECT * FROM Groups",(err,row)=>{
//     res.render('group',{data:row})
//   })
// })

// app.post('/group',(req,res)=>{
//   db.run(`INSERT INTO Groups(name_of_group) VALUES ('${req.body.nameofgroup}')`,()=>{
//     res.redirect('/group')
//   })
// })
//=============delete Group========
// app.get('/group/delete/:id/',(req,res)=>{
//   db.run(`DELETE FROM Groups WHERE id =${req.params.id}`,()=>{
//     res.redirect('/group')
//   })
// })
//==========edit group=============
// app.get('/group/edit/:id',(req,res)=>{
//   db.all(`SELECT * FROM Groups WHERE id=${req.params.id}`,(err,row)=>{
//     res.render('groupedit',{data:row})
//   })
// })

// app.post('/group/edit/:id',(req,res)=>{
//   // res.send('coba')
//   // name,company,telp_number,email
//   db.run(`UPDATE Groups SET name_of_group ='${req.body.name_of_group}'
//      WHERE id=${req.params.id}`,()=>{
//       // company,telp_numbers sesuai dengan database
//       //req.body sesuai dengan ejs name nya apa
//     res.redirect('/group')
//     // res.redirect('/')
//     // res.send(req.params.id)
//   })
// })

// app.get('/groupedit',(req,res)=>{
//   db.all(`SELECT * FROM Groups WHERE id=${req.params.id}`,(err,row)=>{
//     res.render('groupedit',{data:row})
//   })
// })
