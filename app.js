const express = require('express');
const app = express();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/data.db');

app.set('view engine', 'ejs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res)=> {
  res.render('index');
});

//READ DATA CONTACTS
app.get('/contacts', (req, res) => {
  db.all('SELECT * FROM contacts', (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.render('contacts', { dataJsonContacts: rows });

      console.log(rows);
    }
  });
});

//ADD DATA CONTACTS
app.post('/contacts', (req, res) => {
  db.run(`INSERT into contacts (name, company, telp_number, email) VALUES ('${req.body.name}','${req.body.company}','${req.body.telp_number}','${req.body.email}')`, function (err, rows){
    if (err) {
      console.log(err);
    }
  });
  res.redirect('contacts');
  console.log(req.body);

});

// TAMPIL EDIT CONTACTS
app.get('/contacts/edit/:id', (req, res) => {
  db.all(`SELECT * from contacts WHERE id = "${req.param('id')}"`, (err, rows) => {
    res.render('editcontact.ejs', { dataJsonContacts: rows });
    let idContactEdit = req.params.id;
    app.post('/contacts/edit/:id', function (req, res) {
      db.run(`UPDATE contacts SET name = '${req.body.name}', company = '${req.body.company}', telp_number = '${req.body.telp_number}', email = '${req.body.email}' WHERE id = ${idContactEdit}`,function(err){
        if(err){
          console.log(err);
        }
      })
      res.redirect('/contacts')
    })
  })
})

//HAPUS DATA CONTACTS
app.get('/contacts/delete/:id', (req, res) => {
  db.all(`DELETE from contacts WHERE id = "${req.param('id')}"`, (err, rows) => {
    console.log(err);
    res.redirect('../../contacts');
  });
});

//READ CONTACT Address
app.get('/contacts/address/:id', (req, res) => {
  let qAddress = `SELECT * FROM Addresses where ContactId = "${req.params.id}"`;
  db.all(qAddress, (err, rows) => {
    console.log(req.params.id);
    db.get(`select * from Contacts where id = "${req.params.id}"`, (err, rowsContact) => {
      res.render('addresscontact', { data: rows, dataContacts: rowsContact });
    });
  });
});

//WRITE CONTACT Address
app.post('/contacts/address/:id', (req, res) => {
  let insert = `INSERT INTO Addresses (street, city, zipcode, ContactId) VALUES ('${req.body.street}', '${req.body.city}','${req.body.zipcode}', '${req.params.id}')`

  db.run(insert, (err) => {
    // res.send(insert)
    // console.log(insert)
    res.redirect(`/contacts/address/${req.params.id}`);
    // console.log('data diupdate')
  })
})

// db.run(`INSERT into Addresses (street, city, zipcode, ContactId) VALUES ('${req.body.street}','${req.body.city}','${req.body.zipcode}','${req.body.ContactId}')`, function (err) {
//   let errorAdd = err;
//   let qAddress = 'SELECT Addresses.id, Addresses.street, Addresses.city, Addresses.zipcode, Addresses.ContactId, Contacts.name, Contacts.company, Contacts.telp_number, Contacts.email FROM Addresses INNER JOIN Contacts ON Addresses.ContactId = Contacts.id';
//   let qContact = 'SELECT * FROM Contacts';
//   db.all(qAddress, (err, rows) => {
//     if (!err) {
//       // console.log(err);
//       db.all(qContact, (err, rowsContact) => {
//         res.render('addresses', { data: rows, dataContacts: rowsContact, errorMsg: errorAdd });
//       });
//     }
//   });
// });
// });

//READ DATA groups
app.get('/groups', (req, res) => {
  db.all('SELECT * FROM Groups', (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.render('groups', { data: rows });

      console.log(rows);
    }
  });
});

//ADD DATA groups
app.post('/groups', (req, res) => {
  db.run(`INSERT into Groups (name_of_group) VALUES ('${req.body.name_of_group}')`, function (err, rows){
    console.log(err);
    res.redirect('groups');
    console.log(req.body);
  });
});

// TAMPIL EDIT groups
app.get('/groups/edit/:id', (req, res) => {
  db.all(`SELECT * from Groups WHERE id = "${req.params.id}"`, (err, rows) => {
    res.render('editgroups.ejs', { dataJsonContacts: rows });
    let idGroupEdit = req.params.id;
    app.post('/groups/edit/:id', function (req, res) {
      db.run(`UPDATE Groups SET name_of_group = '${req.body.name_of_group}' WHERE id = ${idGroupEdit}`, function (err, rows) {
        if (err) {
          console.log(err);
        }
      });

      res.redirect('/groups');
    });
  });
});

//HAPUS DATA groups
app.get('/groups/delete/:id', (req, res) => {
  db.all(`DELETE from Groups WHERE id = "${req.param('id')}"`, (err, rows) => {
    console.log(err);
    res.redirect('../../groups');
  });
});

//READ DATA addresses
app.get('/addresses', (req, res) => {
  let qAddress = 'SELECT Addresses.id, Addresses.street, Addresses.city, Addresses.zipcode, Addresses.ContactId, Contacts.name, Contacts.company, Contacts.telp_number, Contacts.email FROM Addresses LEFT JOIN Contacts ON Addresses.ContactId = Contacts.id';
  let qContact = 'SELECT * FROM Contacts';
  db.all(qAddress, (err, rows) => {
    // console.log(err);
    if (!err) {
      console.log(err);
      db.all(qContact, (err, rowsContact) => {
        res.render('addresses', { data: rows, dataContacts: rowsContact, errorMsg: '' });
      });
    }
  });
});

//ADD DATA addresses
app.post('/addresses', (req, res) => {
  db.run(`INSERT into Addresses (street, city, zipcode, ContactId) VALUES ('${req.body.street}','${req.body.city}','${req.body.zipcode}','${req.body.ContactId}')`, function (err) {
    let errorAdd = err;
    let qAddress = 'SELECT Addresses.id, Addresses.street, Addresses.city, Addresses.zipcode, Addresses.ContactId, Contacts.name, Contacts.company, Contacts.telp_number, Contacts.email FROM Addresses INNER JOIN Contacts ON Addresses.ContactId = Contacts.id';
    let qContact = 'SELECT * FROM Contacts';
    db.all(qAddress, (err, rows) => {
      if (!err) {
        // console.log(err);
        db.all(qContact, (err, rowsContact) => {
          res.render('addresses', { data: rows, dataContacts: rowsContact, errorMsg: errorAdd });
        });
      }
    });
  });
});

// TAMPIL EDIT addresses
app.get('/addresses/edit/:id', (req, res) => {
  db.all(`SELECT * from Addresses WHERE id = "${req.params.id}"`, (err, rows) => {
    res.render('editaddresses.ejs', { dataJsonAddresses: rows });
    let idAddrressEdit = req.params.id;
    app.post('/addresses/edit/:id', function (req, res) {
      db.run(`UPDATE Addresses SET street = '${req.body.street}', city = '${req.body.city}', zipcode = '${req.body.zipcode}' WHERE id = ${idAddrressEdit}`, function (err) {
        if (err) {
          console.log(err);
        }
      });

      res.redirect('/addresses');
    });
  });
});

//HAPUS DATA addresses
app.get('/addresses/delete/:id', (req, res) => {
  db.all(`DELETE from Addresses WHERE id = "${req.params.id}"`, (err, rows) => {
    console.log(err);
    res.redirect('../../addresses');
  });
});

//READ DATA profile
app.get('/profiles', (req, res) => {
  let qProfile = 'SELECT Profile.id, Profile.username, Profile.password, Profile.ContactId, Contacts.name FROM Profile INNER JOIN Contacts ON Profile.ContactId = Contacts.id';
  let qContact = 'SELECT * FROM Contacts';
  db.all(qProfile, (err, rows) => {
    if (!err) {
      // console.log(err);
      db.all(qContact, (err, rowsContact) => {
        res.render('profiles', { data: rows, dataContacts: rowsContact, errorMsg: '' });
      });
    }
  });
});

//ADD DATA profile
app.post('/profiles', (req, res) => {
  db.run(`INSERT into Profile (username, password, ContactId) VALUES ('${req.body.username}', '${req.body.password}', '${req.body.ContactId}')`, function (err) {
    let errorUniq = err;

    let qProfile = 'SELECT Profile.id, Profile.username, Profile.password, Profile.ContactId, Contacts.name FROM Profile INNER JOIN Contacts ON Profile.ContactId = Contacts.id';
    let qContact = 'SELECT * FROM Contacts';
    db.all(qProfile, (err, rows) => {
      if (!err) {
        // console.log(err);
        db.all(qContact, (err, rowsContact) => {
          res.render('profiles', { data: rows, dataContacts: rowsContact, errorMsg: errorUniq });
        });
        // res.redirect('profiles');
        // console.log(req.body);
      };
    });
  });
});

// TAMPIL EDIT profile
app.get('/profiles/edit/:id', (req, res) => {
  db.all(`SELECT * from Profile WHERE id = "${req.params.id}"`, (err, rows) => {
    let idProfileEdit = req.params.id;
    console.log(rows);
    res.render('editprofile.ejs', { dataJsonProfile: rows });

    app.post('/profiles/edit/:id', function (req, res) {
      db.run(`UPDATE Profile SET username = '${req.body.username}', password = '${req.body.password}' WHERE id = ${req.params.id}`, function (err, rows) {
        if (err) {
          console.log(err);
        }
      });
      //
      res.redirect('../../profiles');
    });
  });
});


//HAPUS DATA profile
app.get('/profiles/delete/:id', (req, res) => {
  db.all(`DELETE from Profile WHERE id = "${req.params.id}"`, (err, rows) => {
    console.log(err);
    res.redirect('../../profiles');
  });
});

//listen on which server
app.listen(3000, function () {
  console.log('listen on port 3000');
});
