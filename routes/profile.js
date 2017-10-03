const express=require('express')
const router=express.Router()
var sqlite3= require ('sqlite3');
var db=new sqlite3.Database('./db/database.db')
const model=require('../models/profile')

let query=`SELECT Profiles.* , Contacts.name FROM Profiles LEFT JOIN Contacts ON
Profiles.Contactsid = Contacts.id ORDER BY Profiles.id`
let query2=`SELECT * FROM Contacts`

router.get('/',(req,res)=>{
  db.all(query,(err,row)=>{
  db.all(query2,(err,row2)=>{
      // data2=kontak
      //data=gabungan koontak profile
      if(err){
        console.log(err);
      }else{
        res.render('profile',{err:err || false ,data:row,data2:row2})
      }
    })
  })
})
//==============profile insert============
router.post('/',(req,res)=>{
  db.run(`INSERT INTO Profiles(username,password,Contactsid) VALUES (
    '${req.body.username}',
    '${req.body.password}',
    '${req.body.Contactsid}')`,(err)=>{
      if(err){
        db.all(query,(err,row)=>{//buat handle redudansi
          db.all(query2,(err,row2)=>{//buat handle halaman error
            // res.send(err)
            res.render('err',{err:'err id dobol', data:row , data2:row2})
          })
        })
      }else {
        res.redirect ('profile')
      }
  })
})
//============profile delete=============
router.get('/delete/:id/',(req,res)=>{
  model.deleteProfile(req.params)
    res.redirect('/profile')
  })
// })
//==========edit Contact=============
router.get('/edit/:id',(req,res)=>{
  let query=`SELECT * FROM Profiles WHERE id=${req.params.id}`
  // WHERE id = ${req.params.id}
  let query2=`SELECT * FROM Contacts`
  db.all(query,(err,dataProfile)=>{
    db.all(query2,(err2,dataContacts)=>{
      // res.send(err)

      res.render('profileedit',{dataProfile:dataProfile[0],dataContacts:dataContacts})
    })
  //  WHERE id = ${req.params.id}
  })
  // db.all(`SELECT * FROM Profiles WHERE id =${req.params.id}`,(err,row)=>{
  })
// })

router.post('/edit/:id',(req,res)=>{
  // res.send('coba')
  // name,company,telp_number,email
  db.run(`UPDATE Profiles SET username ='${req.body.username}',
    password ='${req.body.password}',
    Contactsid='${req.body.Contactsid}'
    WHERE id =${req.params.id}`,()=>{
      // company,telp_numbers sesuai dengan database
      // req.body sesuai dengres.send('oi')an ejs name nya apa
    res.redirect('/profile')
    // res.redirect('/')
  })
})
//
router.get('/profileedit',(req,res)=>{
  db.all(`SELECT * FROM Profiles WHERE id = ${req.params.id}`,(err,row)=>{
    // res.render('profileedit',{data:row})
    res.send(row)
  })
})
module.exports = router;
