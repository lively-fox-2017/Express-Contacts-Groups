const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/data.db')

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get('/', function(req, res){
  res.render('index', {title: 'Home Page'})
})

// Contacts Page

app.get('/contacts', function(req, res){
  let query = `SELECT * FROM Contacts`
  db.all(query, function(err, rows){
    res.render('contacts', {data: rows, title: 'Contacts Page'})
  })
})

app.post('/contacts', function(req, res){
  let query = `INSERT INTO Contacts(name, company, telp_number, email) VALUES(
    '${req.body.name}',
    '${req.body.company}',
    '${req.body.telp_number}',
    '${req.body.email}'
  )`
  db.run(query, function(err, rows){
    res.redirect('/contacts')
  })
})

app.get('/contacts/edit/:id', function(req, res){
  let query = `SELECT * FROM Contacts WHERE id = ${req.params.id}`
  db.all(query, function(err, rows){
    res.render('contactsEdit', {data: rows[0], title: 'Edit Contacts Page'})
  })
})

app.post('/contacts/edit/:id', function(req, res){
  let query = `UPDATE Contacts SET name = '${req.body.name}', company = '${req.body.company}', telp_number = '${req.body.telp_number}', email = '${req.body.email}' WHERE id = ${req.params.id}`
  db.run(query, function(err, rows){
    res.redirect('/contacts')
  })
})

app.get('/contacts/delete/:id', function(req, res){
  let query = `DELETE FROM Contacts WHERE id = ${req.params.id}`
  db.run(query, function(err, rows){
    res.redirect('/contacts')
  })
})

app.get('/contacts/address/:id', function(req, res){
  let qContacts = `SELECT * FROM Contacts WHERE id = ${req.params.id}`
  let qAddress = `SELECT * FROM Addresses LEFT JOIN Contacts ON Addresses.contact_id = Contacts.id WHERE Addresses.contact_id = ${req.params.id}`
  db.all(qContacts, function(err, rowsCont){
    db.all(qAddress, function(err, rowsAdd){
      res.render('addressContact', {dataCon: rowsCont, dataAdd: rowsAdd, title: 'Address Contactc Page'})
      // res.send(rowsAdd)
      // res.send(rowsCont)
    })
  })
})

app.post('/contacts/address/:id', function(req, res){
  let query = `INSERT INTO Addresses(street, city, zipcode, contact_id) VALUES(
    '${req.body.street}',
    '${req.body.city}',
    '${req.body.zipcode}',
    ${req.params.id}
  )`
  db.run(query, function(err, rows){
    res.redirect('/addresses')
  })
})

// Profiles Page

app.get('/profiles', function(req, res){
  let query = `SELECT * FROM Contacts`
  let queryJoin = `SELECT *, Profiles.id as ids FROM Profiles LEFT JOIN Contacts ON Profiles.contact_id = Contacts.id`
  db.all(query, function(err, row){
    db.all(queryJoin, function(err, rows){
      res.render('profiles', {dataCon: row, dataPro: rows, title: 'Profiles Page', dataErr: null})
    })
  })
})

app.post('/profiles', function(req, res){
  let contact_id = `${req.body.contactName}`
  let username = `${req.body.user}`
  let password = `${req.body.pass}`
  let querySel = `SELECT * FROM Profiles`
  let query = `INSERT INTO Profiles(contact_id, username, password) VALUES(
    ${contact_id},
    '${username}',
    '${password}'
  )`
  db.run(query, function(err, rows){
    if(!err) {
      res.redirect('/profiles')
    } else {
      let qContact = `SELECT * FROM Contacts`
      let qProfile = `SELECT *, Profiles.id as ids FROM Profiles LEFT JOIN Contacts ON Profiles.contact_id = Contacts.id`;

      let error = null;

      if(err.code === 'SQLITE_CONSTRAINT') {
        let qForError = `SELECT * FROM Contacts where id = ${contact_id}`;
        db.all(qForError, function(err,data){
          error = `Sorry contact name ${data[0].name} already used`
          db.all(qProfile, function(err, dataProfile){
            db.all(qContact, function(err, dataContact){
              res.render('profiles', {dataCon: dataContact, dataPro: dataProfile, dataErr: error, title: 'Profile Page'})
            })
          })
        })
      }
    }
  })
})

app.get('/profiles/edit/:id', function(req, res){
  let queryJoin = `SELECT * FROM Contacts`
  let query = `SELECT * FROM Profiles WHERE id = ${req.params.id}`
  db.all(queryJoin, function(err, row){
    db.all(query, function(err, rows){
      res.render('profilesEdit', {dataCon: row, dataPro: rows, title: 'Edit Profiles Page'})
    })
  })
})

app.post('/profiles/edit/:id', function(req, res){
  let query = `UPDATE Profiles SET contact_id = ${req.body.contactName}, username = '${req.body.user}', password = '${req.body.pass}' WHERE id = ${req.params.id}
  `
  db.run(query, function(err, rows){
    res.redirect('/profiles')
  })
})

app.get('/profiles/delete/:id', function(req, res){
  let query = `DELETE FROM Profiles WHERE id = ${req.params.id}`
  db.run(query, function(err, rows){
    res.redirect('/profiles')
  })
})

// Addresses Page

app.get('/addresses', function(req, res){
  let qContact = `SELECT * FROM Contacts`
  let qAddresses = `SELECT *, Addresses.id as ids FROM Addresses LEFT JOIN Contacts ON Addresses.contact_id = Contacts.id`
  db.all(qAddresses, function(err, rowsAdd){
    db.all(qContact, function(err, rowsCon){
      res.render('addresses', {dataAdd: rowsAdd, dataCon: rowsCon, title: 'Addresses Page'})
    })
  })
})

app.post('/addresses', function(req, res){
  let query = `INSERT INTO Addresses(street, city, zipcode, contact_id) VALUES(
    '${req.body.street}',
    '${req.body.city}',
    '${req.body.zipcode}',
    ${req.body.contactName}
  )`
  db.run(query, function(err, rows){
    res.redirect('/addresses')
  })
})

app.get('/addresses/edit/:id', function(req, res){
  let qContact = `SELECT * FROM Contacts`
  let qAddress = `SELECT * FROM Addresses WHERE id = ${req.params.id}`
  db.all(qContact, function(err, rowsCont){
    db.all(qAddress, function(err, rowsAdd){
      res.render('addressEdit', {dataAdd: rowsAdd, dataCon: rowsCont, title: 'Edit Address Page'})
      // res.send(rowsAdd)
    })
  })
})

app.post('/addresses/edit/:id', function(req, res){
  let query = `UPDATE Addresses SET street = '${req.body.street}', city = '${req.body.city}', zipcode = '${req.body.zipcode}', contact_id = ${req.body.contactName} WHERE id = ${req.params.id}
  `
  db.run(query, function(err, rows){
    res.redirect('/addresses')
  })
})

app.get('/addresses/delete/:id', function(req, res){
  let query = `DELETE FROM Addresses WHERE id = ${req.params.id}`
  db.run(query, function(err, rows){
    res.redirect('/addresses')
  })
})

// Address with Contact Page

app.listen(3000, function(){
  console.log(`AYO JALAN!`)
})
