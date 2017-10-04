const express = require('express')
const app = express()
const bodyparser = require('body-parser');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/data.db');
app.set('view engine', 'ejs')



app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())

let query1 = `SELECT Profiles.*, Contacts.name, Contacts.id as contactsId FROM Profiles LEFT JOIN Contacts ON Contacts.id = Profiles.ContactsID`
let query2 = `SELECT * FROM Contacts`
let query3 = `SELECT Addresses.*, Contacts.name, Contacts.id as contactsId FROM Addresses LEFT JOIN Contacts ON Contacts.id = Addresses.ContactsID`
// app.get('/', function (req, res) {
//   res.send(' ')
// })

const index = require('./routers/index')
app.use('/', index);

const contacts = require('./routers/contacts')
app.use('/contacts', contacts);


const profiles = require('./routers/profiles')
app.use('/profiles', profiles);

const addresses = require('./routers/addresses')
app.use('/addresses', addresses)
//
// const groups = require('./routers/groups')
// app.use('/', groups)



// #1 menampilkan semua data contacts
// app.get('/contacts', function(req, res) {
//
//
//   db.all('SELECT * FROM contacts', function(err, row){
//     if(err){
//       console.log(err)
//     }else{
//     res.render('contacts', {data:row})
//     }
//   })
//
// })

app.get('/contacts/viewAddresses/:id', function(req, res) {
  db.all(`SELECT * FROM addresses WHERE ContactsID = ${req.params.id}`, function(err, row){
    db.all(query3, (err,dataContact)=>{
      if(err){
        console.log(err)
      }else{
        console.log(dataContact)
      res.render('viewAddresses', {row:row, dataContact:dataContact})
      }
    })
  })
})

// #2 Menerima input contacts
// app.post('/contacts', function(req, res){
//   db.run(`INSERT INTO contacts (name, company, telp_number, email) VALUES ('${req.body.name}', '${req.body.company}',
//   ${req.body.telp_number}, '${req.body.email}'  )`, (err)=>{
//     if(err){
//       console.log(err)
//     }else{
//       res.redirect('/contacts')
//     }
//   })
//
// })

//
// app.get('/contacts/edit/:id', function(req, res){
//
//     db.each(`SELECT * FROM contacts WHERE id = ${req.params.id}`, (err, data)=> {
//       if(err){
//         console.log(err)
//       }else{
//         res.render('editContacts',{data:data})
//       }
//     })
// })

// Menerima data form untuk update contact
// (name, company, telp_number, email
// app.post('/contacts/edit/:id', function(req, res){
//
//   db.run(`UPDATE contacts SET
//     name = '${req.body.name}',
//     company = '${req.body.company}',
//     telp_number = '${req.body.telp_number}',
//     email = '${req.body.email}' WHERE
//     id = '${req.params.id}'`, (err) =>{
//         if(err){
//           console.log(err)
//         }else {
//           res.redirect('/contacts')
//         }
//   })
// })

// app.get('/contacts/delete/:id', function(req, res){
//   db.run(`DELETE FROM contacts WHERE id = ${req.params.id}`, (err, data)=>{
//     if(err){
//       console.log(err)
//     }else{
//       res.redirect('/contacts')
//     }
//   })
// })


// ++++++++++++++++++++++++++++++++++++++++++++ //

// Groups

// app.get('/groups', function (req, res){
//   db.all(`SELECT * FROM groups`, (err, data) =>{
//     if(err){
//       console.log(err)
//     }else {
//       res.render('groups', {data:data})
//     }
//   })
// })

app.post('/groups', function (req, res){
  db.run(`INSERT INTO groups (name_of_group) VALUES ('${req.body.name_of_group}')`, (err, data)=>{
    if(err){
      console.log(err)
    }else {
      res.redirect('/groups')
    }
  })
})

app.get('/groups/edit/:id', function (req, res){
  // console.log(req.params);
  db.each(`SELECT * FROM groups WHERE id = ${req.params.id}`, (err, data)=>{
    if(err){
      console.log(err)
    }else {
      res.render('editGroups',{data:data})
    }
  })
})

app.post('/groups/edit/:id', function (req, res){
  db.run(`UPDATE groups SET name_of_group = '${req.body.name_of_group}'
   WHERE id = '${req.params.id}'`, (err)=>{
     if(err){
       console.log(err)
     }else{
       res.redirect('/groups')
     }
   })
})

app.get('/groups/delete/:id', function (req, res){
  db.run(`DELETE FROM groups WHERE id = '${req.params.id}'`, (err, data)=>{
    if(err){
      console.log(err)
    }else{
      res.redirect('/groups')
    }
  })
})

//======================================================
//Addresses

app.get('/addresses', function(req, res){
  db.all(query3, (err, data)=>{
    db.all(query2, (err, dataContact)=>{
      if(err){
        console.log(err)
      }else{
        // res.send(dataContact)
        res.render('addresses', {data:data,dataContact:dataContact})
      }
    })
  })
})



app.post('/addresses', function(req, res){
  console.log(req.body)
  db.run(`INSERT INTO addresses (street, city, zipcode, ContactsID) VALUES("${req.body.street}",
    "${req.body.city}", "${req.body.zipcode}", "${req.body.ContactsID}")`, (err)=>{
      if(err){
        console.log(err)
      }else{
        res.redirect('/addresses')
      }
    })
})

app.get('/addresses/edit/:id', function(req, res){

  db.each(`SELECT * FROM addresses WHERE id = ${req.params.id}`, (err, data)=> {
    db.all(query2, (err, dataContact)=>{
      if(err){
        console.log(err)
      }else{
        res.render('editAddresses',{data:data, dataContact:dataContact})
      }
    })
  })
})


app.post('/addresses/edit/:id', function(req, res){

  db.run(`UPDATE addresses SET street = '${req.body.street}',
  city = '${req.body.city}',
  zipcode = '${req.body.zipcode}',
  ContactsID = '${req.body.ContactsID}' WHERE id = '${req.params.id}'` , (err)=>{
    if(err){
      console.log(err)
    }else{
      res.redirect('/addresses')
    }
  })
})

app.get('/addresses/delete/:id', function(req, res){
  db.run(`DELETE FROM addresses WHERE id = ${req.params.id}`, (err)=>{
    if(err){
      console.log(err)
    }else{
      res.redirect('/addresses')
    }
  })
})

//==============================================
//Profiles
//
// app.get('/profiles', function(req, res){
//
//   db.all(query1, (err, data)=>{
//     db.all(query2, (err, data2)=>{static create(){
  //   db.run(`INSERT INTO contacts (name, company, telp_number, email) VALUES ("${req.body.name}", "${req.body.company}",
  //   "${req.body.telp_number}", "${req.body.email}")`
  // }

//
//     if(err){
//       console.log(err)
//     }else{
//
//       res.render('profiles', {err: err || false,data:data, data2:data2})
//     }
//   })
//  })static create(){
  //   db.run(`INSERT INTO contacts (name, company, telp_number, email) VALUES ("${req.body.name}", "${req.body.company}",
  //   "${req.body.telp_number}", "${req.body.email}")`
  // }

// })


//
// app.post('/profiles', function(req, res){
//
//   db.run(`INSERT INTO profiles ('username', 'password', ContactsID) VALUES ("${req.body.username}", "${req.body.password}", "${req.body.ContactsID}")`, (err) => {
//     console.log(err);
//     if(err){
//         db.all(query2, (err, data)=>{
//           db.all(query2, (err, data2)=>{
//             res.render('error',{err:'ID DOUBLE', data:data, data2:data2})
//           })
//         })
//       }else{  res.redirect('profiles')}
//    })
//   })



//
// app.get('/profiles/edit/:id', function(req, res){
//
//   db.each(`SELECT * FROM profiles WHERE id = ${req.params.id}`, (err, data)=>{
//     db.all(query2, (err, data2)=>{
//       if(err){
//         console.log(err)
//       }else{
//         res.render('editProfile', {err: err || false,data:data, data2:data2})
//       }
//     })
//   })
//
// })


// app.post('/profiles/edit/:id', function (req, res){
//   db.run(`UPDATE profiles SET username= '${req.body.username}', password='${req.body.password}, ContactsID= "${req.body.ContactsID}" ' WHERE id= '${req.params.id}'`, (err)=>{
//     if(err){
//         db.all(query2, (err, data)=>{
//           db.all(query2, (err, data2)=>{
//             res.render('error',{err:'ID DOUBLE', data:data, data2:data2})
//           })
//         })
//       }else{  res.redirect('profiles')}
//    })
//   })

//
// router.get('/delete/:id', function (req, res){
//   db.run(`DELETE FROM profiles WHERE id = ${req.params.id}`, (err)=>{
//     if(err){
//       console.log(err)
//     }else{
//       res.redirect('/profiles')
//     }
//   })
// })

app.listen(3001, function (){
  console.log('jadi bro')
})
