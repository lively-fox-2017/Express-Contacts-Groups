const express = require('express');
const app = express();
// set the view engine to ejs
app.set('view engine', 'ejs');
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json 
app.use(bodyParser.json())
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

app.use(express.static(__dirname + '/views'));

// MENU ----- 
app.get('/', (req, res) => {
  res.render('index');
});
//DATA KONTAK
app.get('/contacts', (req, res) => {
  db.all('SELECT * from Contacts',(err, rows)=>{
    res.render('contacts',{dataJsonContact:rows});
    console.log(rows.body);
  });
});

//TAMBAH DATA
app.post('/contacts', (req, res) => {
  db.run(`INSERT into Contacts (nama, company, telp_number, email) VALUES 
  ('${req.body.nama}','${req.body.company}','${req.body.phone}','${req.body.email}')`)
  res.redirect('contacts');
  console.log(req.body);
});

//AMBIL EDIT
app.get('/contacts/edit/:id', (req, res) => {
  db.all(`SELECT * from Contacts WHERE id = "${req.param('id')}"`,(err, rows)=>{
    console.log(rows);
    res.render('editContact',{dataJsonContact:rows});
  });
});

//HASIL EDIT
app.post('/contacts/edit/:id', (req, res) => {
  // "UPDATE table-name SET column-name = 'value', column-name = value,WHERE condition"
  
  let str = "UPDATE Contacts set nama ='" +req.body.nama+ "',";
  str += "company = '" +req.body.company+"',";
  str += "telp_number = '"+req.body.phone+"',";
  str += "email = '"+req.body.email+"'";
  str += "WHERE id = "+req.param('id');
  db.all(str,(err, rows) => {
    console.log(err);
    res.redirect('../../contacts');
    console.log(rows.body);
  });
});

//HAPUS DATA
app.get('/contacts/delete/:id', (req, res) => {
  db.all(`DELETE from Contacts WHERE id = "${req.param('id')}"`,(err, rows)=>{
    console.log(err);
    res.redirect('../../contacts');
  });
});

//GROUPS -------

//DATA GRUP
app.get('/groups', (req, res) => {
  db.all('SELECT * from Groups',(err, rows)=>{
    res.render('groups',{dataJsonGroups:rows});
    console.log(rows.body);
  });
});
//TAMBAH DATA
app.post('/groups', (req, res) => {
  db.run(`INSERT into Groups (name_of_group) VALUES ('${req.body.nama_group}')`)
  res.redirect('groups');
  console.log(req.body);
});

//AMBIL EDIT
app.get('/groups/edit/:id', (req, res) => {
  db.all(`SELECT * from Groups WHERE id = "${req.param('id')}"`,(err, rows)=>{
    console.log(rows);
    res.render('editGroups',{dataJsonGroups:rows});
  });
});

//HASIL EDIT
app.post('/groups/edit/:id', (req, res) => {
  // UPDATE table-name SET column-name = value, column-name = value,WHERE condition
  let str = "UPDATE Groups set name_of_group ='" +req.body.nama_group+ "'";
  str += "WHERE id = "+req.param('id');
  db.all(str,(err, rows)=>{
    console.log(err);
    res.redirect('../../groups');
    console.log(rows);
  });
});

//HAPUS DATA
app.get('/groups/delete/:id', (req, res) => {
  db.all(`DELETE from Groups WHERE id = "${req.param('id')}"`,(err, rows)=>{
    console.log(err);
    res.redirect('../../groups');
  });
});

//Profile -------

//DATA Profile
app.get('/profiles', (req, res) => {
  let query = 'SELECT Profile.id, Profile.username, Profile.password, Contacts.nama from Profile LEFT JOIN Contacts ON Profile.ContactsId = Contacts.id'
  // let queryNama='SELECT Contacts.nama from Contacts';
  db.all(query,(err, rows)=>{
    if(!err){
      // res.send(rows)
      // console.log(rows);
      db.all('SELECT * from Contacts',(err, rowsContact)=>{
        // res.send(rows)
        res.render('profiles',{dataJsonProfiles:rows,NamaContacts:rowsContact});
        console.log(rows);
      });
    }
    
  });
});

//TAMBAH DATA
app.post('/profiles', (req, res)=> {
  // res.send(req)

  db.run(`INSERT into Profile (username, password , ContactsId) VALUES ('${req.body.username}','${req.body.password}','${req.body.name}')`,(err)=>{
    if(err=="Error: SQLITE_CONSTRAINT: UNIQUE constraint failed: Profile.ContactsId at Error (native) errno: 19, code: 'SQLITE_CONSTRAINT'"){
      console.log('Ini Error');
      res.send(err)
      console.log(req.body);
      // SQLITE_CONSTRAINT: UNIQUE constraint failed: Profile.ContactsId
      // at Error (native)
    }else {
      res.redirect('profiles');
      console.log(req.body);
    }
  })
  
});

//AMBIL EDIT
app.get('/profiles/edit/:id', (req, res) => {
  db.all(`SELECT * from Profile WHERE id = "${req.param('id')}"`,(err, rows)=>{
    console.log(rows);
    res.render('editProfiles',{dataJsonProfiles:rows});
  });
});

//HASIL EDIT
app.post('/profiles/edit/:id', (req, res) => {
  // UPDATE table-name SET column-name = value, column-name = value,WHERE condition
  let str = "UPDATE Profile set username ='" +req.body.username+ "',";
  str += "password = '" +req.body.password+"'";
  str += "WHERE id = "+req.param('id');
  db.all(str,(err, rows)=>{
    console.log(err);
    res.redirect('../../profiles');
    console.log(rows.body);
  });
});

//HAPUS DATA
app.get('/profiles/delete/:id', (req, res) => {
  db.all(`DELETE from Profile WHERE id = "${req.param('id')}"`,(err, rows)=>{
    console.log(err);
    res.redirect('../../profiles');
  });
});

//Addresses -------

//DATA GRUP
app.get('/addresses', (req, res) => {
  db.all('SELECT * from Addresses',(err, rows)=>{
    res.render('addresses',{dataJsonAddresses:rows});
    console.log(rows.body);
  });
});
//TAMBAH DATA
app.post('/addresses', (req, res)=> {
  db.run(`INSERT into Addresses (street, city, zipcode) VALUES ('${req.body.street}','${req.body.city}','${req.body.zipcode}')`);
  res.redirect('addresses');
  console.log(req.body);
});

//AMBIL EDIT
app.get('/addresses/edit/:id', (req, res) => {
  db.all(`SELECT * from Addresses WHERE id = "${req.param('id')}"`,(err, rows)=>{
    console.log(rows);
    res.render('editAddresses',{dataJsonAddresses:rows});
  });
});

//HASIL EDIT
app.post('/addresses/edit/:id', (req, res) => {
  // UPDATE table-name SET column-name = value, column-name = value,WHERE condition
  let str = "UPDATE Addresses set street ='" +req.body.street+ "',";
  str += "city = '" +req.body.city+"',";
  str += "zipcode = '"+req.body.zipcode+"'";
  str += "WHERE id = "+req.param('id');
  db.all(str,(err, rows)=>{
    console.log(err);
    res.redirect('../../addresses');
    console.log(rows.body);
  });
});

//HAPUS DATA
app.get('/addresses/delete/:id', (req, res) => {
  db.all(`DELETE from Addresses WHERE id = "${req.param('id')}"`,(err, rows)=>{
    console.log(err);
    res.redirect('../../addresses');
  });
});

app.listen(3000, () => {
  console.log('Membuka port 3000!');
});