const express = require('express')
const app = express()

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/data.db');

app.set('view engine', 'ejs')

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

let qSelectProfiles = `SELECT * FROM  contacts C JOIN  profiles P ON C.id = P.idContacts`
let qSelectContacts = `SELECT * FROM contacts`
let qSelectAddress = `SELECT * FROM  contacts C JOIN  addresses A ON C.id = A.idContacts`
let qSelectGroups = `SELECT * FROM contacts C JOIN contactGroup CG on C.id = CG.idContacts JOIN groups G ON CG.idGroups = G.id`
app.get('/', function (req, res) {
  res.render('index')
})

app.get('/contacts', (req, res)=>{
  db.all(`SELECT * FROM contacts`, (err, rows)=>{
    // res.send(rows)
    res.render('contacts', {dataContacts : rows})
  })
})

app.post('/contacts', (req, res)=>{
  db.run(`INSERT INTO contacts (name, company, telp_number, email) VALUES ('${req.body.name}','${req.body.company}','${req.body.telp_number}', '${req.body.email}')`,() =>{
    res.redirect('/contacts')
  })
})

app.get('/contacts/edit/:id', (req, res)=>{
  db.all(`SELECT * FROM contacts WHERE id = ${req.params.id}`, (err, rows)=>{
    // res.send(rows)
    res.render('contactsedit', {dataContacts : rows})
  })
})

app.post('/contacts/edit/:id', (req, res) => {
  db.run(`UPDATE contacts SET name = '${req.body.name}', company = '${req.body.company}', telp_number = '${req.body.telp_number}', email='${req.body.email}'
     WHERE id = ${req.params.id}`, () => {
     res.redirect('/contacts');
   })
})

app.get('/contacts/delete/:id', (req, res)=>{
  db.run(`DELETE FROM contacts WHERE id = ${req.params.id}`,
  ()=>{
    res.redirect('/contacts')
  })
})


app.get('/profiles', (req, res)=>{
  db.all(qSelectProfiles, (err, rows) => {
    db.all(qSelectContacts, (err, rowscontacts) =>{
      if (!err) {
        res.render('profiles', {dataProfile : rows, dataContacts : rowscontacts, dataError: null})
      }else {
        res.send(err)
      }
    })
  })
})

app.post('/profiles', (req, res)=>{
  db.run(`INSERT INTO profiles (username, password, idContacts) VALUES
  ('${req.body.username}', '${req.body.password}',${req.body.idContacts})`, (err) => {
    if (!err) {
      res.redirect('/profiles')
    }else {
      db.all(qSelectProfiles, (err, rows) => {
        db.all(qSelectContacts, (err, rowscontacts) =>{
          res.render('profilesERR', {dataProfile : rows, dataContacts : rowscontacts, dataError : 'ID Contact Sudah Terpakai!!!'})
        })
      })
    }
  })
})

app.get('/profiles/edit/:id', (req, res)=>{
  db.all(`SELECT * FROM contacts C JOIN profiles P ON C.id = P.idContacts
    WHERE P.id = ${req.params.id}`, (err, rows) => {
      db.all(qSelectContacts, (err, rowscontacts)=>{
        if (!err) {
          res.render('profileEdit', {dataProfile : rows, dataContacts : rowscontacts})
        } else {
          res.send(err)
        }
      })
  })
})

app.post('/profiles/edit/:id', (req, res) => {
  db.run(`UPDATE profiles SET username = '${req.body.username}', password = '${req.body.password}', idContacts = '${req.body.idContacts}'
     WHERE id = ${req.params.id}`, (err) => {
     if (!err) {
       res.redirect('/profiles');
     }else {
       db.all(qSelectProfiles, (err, rows) => {
         db.all(qSelectContacts, (err, rowscontacts) =>{
           res.render('profilesERR', {dataProfile : rows, dataContacts : rowscontacts, dataError : 'ID Contact Sudah Terpakai!!!'})
         })
       })
     }
  })
})

app.get('/profiles/delete/:id', (req, res)=>{
  db.run(`DELETE FROM profiles WHERE id = ${req.params.id}`,
  ()=>{
    res.redirect('/profiles')
  })
})

app.get('/addresses', (req, res)=>{
  db.all(qSelectAddress, (err, rows)=>{
    db.all(qSelectContacts, (err, rowsContacts)=>{
      res.render('addresses', {dataAddress : rows, dataContacts: rowsContacts})
    })
  })
})

app.post('/addresses', (req, res)=>{
  db.run(`INSERT INTO addresses (street, city, zipcode, idContacts) VALUES ('${req.body.street}','${req.body.city}','${req.body.zipcode}','${req.body.idContacts}')`,() =>{
    res.redirect('/addresses')
  })
})

app.get('/addresses/edit/:id', (req, res)=>{
  db.all(`SELECT * FROM contacts C JOIN addresses A ON C.id = A.idContacts
    WHERE A.id = ${req.params.id}`, (err, rows) => {
      db.all(qSelectContacts, (err, rowscontacts)=>{
        if (!err) {
          // res.send(rowscontacts)
          res.render('addressesEdit', {dataAddress : rows, dataContacts : rowscontacts})
        } else {
          res.send(err)
        }
      })
  })
})

app.post('/addresses/edit/:id', (req, res) => {
  db.run(`UPDATE addresses SET street = '${req.body.street}', city = '${req.body.city}', zipcode = '${req.body.zipcode}', idContacts = '${req.body.idContacts}'
     WHERE id = ${req.params.id}`, () => {
     res.redirect('/addresses');
   })
})

app.get('/addresses/delete/:id', (req, res)=>{
  db.run(`DELETE FROM addresses WHERE id = ${req.params.id}`,
  ()=>{
    res.redirect('/addresses')
  })
})

app.get('/groups', (req, res)=>{
  db.all(qSelectGroups, (err, rows)=>{
    // res.send(rows)
    res.render('groups', {dataGroups : rows})
  })
})

app.post('/groups', (req, res)=>{
  db.run(`INSERT INTO groups (name_of_group) VALUES ('${req.body.name_of_group}')`,() =>{
    res.redirect('/groups')
  })
})

app.get('/groups/edit/:id', (req, res)=>{
  db.all(`SELECT * FROM groups WHERE id = ${req.params.id}`, (err, rows)=>{
    // res.send(rows)
    res.render('groupsedit', {dataGroups : rows})
  })
})

app.post('/groups/edit/:id', (req, res) => {
  db.run(`UPDATE groups SET name_of_group = '${req.body.name_of_group}'
     WHERE id = ${req.params.id}`, () => {
     res.redirect('/groups');
   })
})

app.get('/groups/delete/:id', (req, res)=>{
  db.run(`DELETE FROM groups WHERE id = ${req.params.id}`,
  ()=>{
    res.redirect('/groups')
  })
})

app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
})
