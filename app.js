const express=require('express')
const app=express()
var bodyParser = require('body-parser')
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var sqlite3= require ('sqlite3');
var db=new sqlite3.Database('./db/database.db')
// console.log(db);
let query=`SELECT Profiles.* , Contacts.name FROM Profiles LEFT JOIN Contacts ON
Profiles.Contactsid = Contacts.id ORDER BY Profiles.id`
let query2=`SELECT * FROM Contacts`
app.get('/',(req,res)=>{
  res.render('index',{title:'Brother Company'})
})
//===========contact==============
app.get('/contact',(req,res)=>{
  db.all("SELECT * FROM Contacts",(err,row)=>{
    res.render('contact',{data:row})
    // res.send(row)
  })
})

app.get('/contact/addressview/:id/',(req,res)=>{
  db.all(`SELECT * FROM Addresses LEFT JOIN Contacts ON
    Addresses.idContacts=Contacts.id`,(err,rowAdressview)=>{
    db.all("SELECT * FROM Contacts",(err,rowContactview)=>{
      res.render('addressview',{dataAddress:rowAdressview,dataContacts:rowContactview})
      // res.send('rowAdress')
    })
  })
})
//============menu insert===========
app.post('/contact',(req,res)=>{
  db.run(`INSERT INTO Contacts(name,company,telp_number,email) VALUES
  ('${req.body.name}',
  '${req.body.company}',
  '${req.body.telp_number}',
  '${req.body.email}')`,()=>{
    res.redirect('/contact')
  })
})
//=============delete========
app.get('/contact/delete/:id/',(req,res)=>{
  db.run(`DELETE FROM Contacts WHERE id =${req.params.id}`,()=>{
    res.redirect('/contact')
  })
})
//==========edit Contact=============
app.get('/contact/edit/:id',(req,res)=>{
  db.all(`SELECT * FROM Contacts WHERE id=${req.params.id}`,(err,row)=>{
    res.render('contactedit',{data:row})
  })
})

app.post('/contact/edit/:id',(req,res)=>{
  // res.send('coba')
  // name,company,telp_number,email
  db.run(`UPDATE Contacts SET name='${req.body.name}',
    company='${req.body.company}',
    telp_number='${req.body.telp}',
    email='${req.body.email}' WHERE id=${req.params.id}`,()=>{
      // company,telp_numbers sesuai dengan database
      //req.body sesuai dengan ejs name nya apa

    res.redirect('/contact')
    // res.redirect('/')
  })
})

app.get('/contactedit',(req,res)=>{
  db.all(`SELECT * FROM Contacts WHERE id=${req.params.id}`,(err,row)=>{
    res.render('contactedit',{data:row})
  })
})
//========================groups======================
app.get('/group',(req,res)=>{
  db.all("SELECT * FROM Groups",(err,row)=>{
    res.render('group',{data:row})
  })
})

app.post('/group',(req,res)=>{
  db.run(`INSERT INTO Groups(name_of_group) VALUES ('${req.body.nameofgroup}')`,()=>{
    res.redirect('/group')
  })
})
//=============delete Group========
app.get('/group/delete/:id/',(req,res)=>{
  db.run(`DELETE FROM Groups WHERE id =${req.params.id}`,()=>{
    res.redirect('/group')
  })
})
//==========edit group=============
app.get('/group/edit/:id',(req,res)=>{
  db.all(`SELECT * FROM Groups WHERE id=${req.params.id}`,(err,row)=>{
    res.render('groupedit',{data:row})
  })
})

app.post('/group/edit/:id',(req,res)=>{
  // res.send('coba')
  // name,company,telp_number,email
  db.run(`UPDATE Groups SET name_of_group ='${req.body.name_of_group}'
     WHERE id=${req.params.id}`,()=>{
      // company,telp_numbers sesuai dengan database
      //req.body sesuai dengan ejs name nya apa
    res.redirect('/group')
    // res.redirect('/')
    // res.send(req.params.id)
  })
})

app.get('/groupedit',(req,res)=>{
  db.all(`SELECT * FROM Groups WHERE id=${req.params.id}`,(err,row)=>{
    res.render('groupedit',{data:row})
  })
})
//===============address========================
app.get('/address',(req,res)=>{
  db.all(`SELECT * FROM Addresses LEFT JOIN Contacts ON
    Addresses.idContacts=Contacts.id`,(err,rowAdress)=>{
    db.all("SELECT * FROM Contacts",(err,rowContact)=>{
      res.render('address',{dataAddress:rowAdress,dataContacts:rowContact})
      // res.send('rowAdress')
    })
  })
})
//================insert===================
app.post('/address',(req,res)=>{
  db.run(`INSERT INTO Addresses(street,city,zipcode,idContacts) VALUES
  ('${req.body.street}',
  '${req.body.city}',
  '${req.body.zipcode}',
  '${req.body.idContacts}')`,()=>{
    res.redirect('/address')
  })
})
app.get('/address/delete/:id/',(req,res)=>{
  db.run(`DELETE FROM Addresses WHERE id =${req.params.id}`,()=>{
    res.redirect('/address')
  })
})
//==========edit Contact=============
app.get('/address/edit/:id',(req,res)=>{
  db.all(`SELECT * FROM Addresses WHERE id=${req.params.id}`,(err,row)=>{
    res.render('addressedit',{data:row})
  })
})

app.post('/address/edit/:id',(req,res)=>{
  // res.send('coba')
  // name,company,telp_number,email
  db.run(`UPDATE Addresses SET street='${req.body.street}',
    city='${req.body.city}',
    zipcode='${req.body.zipcode}'
     WHERE id=${req.params.id}`,()=>{
      // company,telp_numbers sesuai dengan database
      //req.body sesuai dengan ejs name nya apa
    res.redirect('/address')
    // res.redirect('/')
  })
})

app.get('/addressedit',(req,res)=>{
  db.all(`SELECT * FROM Groups WHERE id=${req.params.id}`,(err,row)=>{
    res.render('addressedit',{data:row})
  })
})
//===============================profile==============
app.get('/profile',(req,res)=>{

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
app.post('/profile',(req,res)=>{
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
app.get('/profile/delete/:id/',(req,res)=>{
  db.run(`DELETE FROM Profiles WHERE id =${req.params.id}`,()=>{
    res.redirect('/profile')
  })
})
//==========edit Contact=============
app.get('/profile/edit/:id',(req,res)=>{
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

app.post('/profile/edit/:id',(req,res)=>{
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
app.get('/profileedit',(req,res)=>{
  db.all(`SELECT * FROM Profiles WHERE id = ${req.params.id}`,(err,row)=>{
    // res.render('profileedit',{data:row})
    res.send(row)
  })
})


// app.post('/contact',()=>{
//   req.redirect()
// })
app.listen(3001,()=>{
  console.log('Jalan di Port 3001');
})
