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
function getContactsTable() {
  // db.all('SELECT * from Contacts',(err, rowsContact)=>{
  //   // res.send(rows)
  //   res.render('profiles',{dataJsonProfiles:rows,NamaContacts:rowsContact});
  //   console.log(rows);
  // });
}
app.get('/profiles', (req, res) => {
  let query = 'SELECT Profile.id, Profile.username, Profile.password, Contacts.nama from Profile LEFT JOIN Contacts ON Profile.ContactsId = Contacts.id'
  db.all(query,(err, rows)=>{
    if(!err){
      db.all('SELECT * from Contacts',(err, rowsContact)=>{
        res.render('profiles',{pesanError:'',dataJsonProfiles:rows,NamaContacts:rowsContact});
        console.log(rows);
      });
    }
  });
});

//TAMBAH DATA
app.post('/profiles', (req, res)=> {
  // res.send(req)
  db.run(`INSERT into Profile (username, password , ContactsId) VALUES ('${req.body.username}','${req.body.password}','${req.body.name}')`,(err)=>{
    if(err){
      let query = 'SELECT Profile.id, Profile.username, Profile.password, Contacts.nama from Profile LEFT JOIN Contacts ON Profile.ContactsId = Contacts.id'
      db.all(query,(err, rows)=>{
        if(!err){
          db.all('SELECT * from Contacts',(err, rowsContacts)=>{
            // res.send(rows)
            res.render('profiles',{pesanError:'Salah', dataJsonProfiles:rows,NamaContacts:rowsContacts});
            console.log(rows);
          });
        }
      });
      // SQLITE_CONSTRAINT: UNIQUE constraint failed: Profile.ContactsId
      // at Error (native)
    }else {
      res.redirect('profiles');
      // console.log(req.body);
    }
  })
  
});

//AMBIL EDIT
app.get('/profiles/edit/:id', (req, res) => {
  db.all(`SELECT * from Profile WHERE id = "${req.param('id')}"`,(err, rows)=>{
    // console.log(rows);
    if(!err){
      db.all('SELECT * from Contacts',(err, rowsContact)=>{
        res.render('editProfiles',{NamaContacts:rowsContact,dataJsonProfiles:rows});
      })
    }
    
  });
});

//HASIL EDIT
app.post('/profiles/edit/:id', (req, res) => {
  // UPDATE table-name SET column-name = value, column-name = value,WHERE condition
  let str = "UPDATE Profile set ContactsId = '"+req.body.name+"', username ='" +req.body.username+ "',";
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
  db.all('SELECT Addresses.id, Addresses.street, Addresses.city, Addresses.zipcode, Contacts.nama from Addresses LEFT JOIN Contacts ON Addresses.ContactsId = Contacts.id',(err, rows)=>{
    // SELECT Profile.id, Profile.username, Profile.password, Contacts.nama from Profile LEFT JOIN Contacts ON Profile.ContactsId = Contacts.id'
    if(!err){
      
      db.all('SELECT * from Contacts',(err, rowsContact)=>{
        // res.send(rows)
        res.render('addresses',{dataJsonAddresses:rows, dataJsonContacts:rowsContact});
        console.log(rows);
        
      })
    }else {
      console.log(err);
    }
    
  });
});
//TAMBAH DATA
app.post('/addresses', (req, res)=> {
  db.run(`INSERT into Addresses (street, city, zipcode, ContactsId) VALUES ('${req.body.street}','${req.body.city}','${req.body.zipcode}','${req.body.name}')`);
  // db.run(`INSERT into Profile (username, password , ContactsId) VALUES ('${req.body.username}','${req.body.password}','${req.body.name}')`,(err)=>{
  res.redirect('addresses');
  console.log(req);
});

//AMBIL EDIT
app.get('/addresses/edit/:id', (req, res) => {
  db.all(`SELECT * from Addresses WHERE id = "${req.param('id')}"`,(err, rows)=>{
    // console.log(rows);
    if(!err){
      db.all('SELECT * from Contacts',(err, rowsContact)=>{
        // res.render('editProfiles',{NamaContacts:rowsContact,dataJsonProfiles:rows});
        res.render('editAddresses',{dataJsonAddresses:rows, NamaContacts:rowsContact});
      })
    }
    
  });
});

//HASIL EDIT
app.post('/addresses/edit/:id', (req, res) => {
  // UPDATE table-name SET column-name = value, column-name = value,WHERE condition
  let str = "UPDATE Addresses set ContactsId = '"+req.body.name+"', street ='" +req.body.street+ "',";
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

//TAMBAHAN ADDRESS WITH CONTACTS
app.get('/addresses_with_contact', (req, res) => {
    // Id	Street	City	ZIP code	Contact Name	Company	Telp Number	Email	Actions
  db.all('SELECT Addresses.id, Addresses.street, Addresses.city, Addresses.zipcode, Contacts.nama, Contacts.company, Contacts.telp_number, Contacts.email from Addresses LEFT JOIN Contacts ON Addresses.ContactsId = Contacts.id' ,(err, rows)=>{
  //   let query = "SELECT * FROM Addresses";
  //    query += "UNION SELECT * from Contacts";
  //  db.all(query,(err,rows)=>{
  // SELECT id, street, city, zipcode FROM Addresses UNION ALL SELECT nama, company, telp_number, email from Contacts
  // SELECT column-names  FROM table-name UNION SELECT column-names FROM table-name
  // SELECT Profile.id, Profile.username, Profile.password, Contacts.nama from Profile LEFT JOIN Contacts ON Profile.ContactsId = Contacts.id'
    if(!err){
      db.all('SELECT * from Contacts',(err, rowsContact)=>{
        // res.send(rows)
        res.render('addresses_with_contact',{dataJsonAddresses:rows, dataJsonContacts:rowsContact});
        console.log(rows);
      })
    }else {
      console.log(err);
    }
  });
});

//TAMBAH DATA ADDRESS WITH CONTACTS
app.post('/addresses_with_contact', (req, res)=> {
  // res.send(req)
  // db.run(`INSERT into Profile (username, password , ContactsId) VALUES ('${req.body.username}','${req.body.password}','${req.body.name}')`,(err)=>{
    db.run(`INSERT into Addresses (street, city, zipcode, ContactsId) VALUES ('${req.body.street}','${req.body.city}','${req.body.zipcode}','${req.body.name}')`,(err)=>{
      if(err){
        console.log(err);
      }else {
        res.redirect('addresses_with_contact');
        // console.log(req.body);
      }
    });  
});

//AMBIL DATA ADDRESS WITH CONTACTS
app.get('/addresses_with_contact/edit/:id', (req, res) => {
  db.all(`SELECT * from Addresses WHERE id = "${req.param('id')}"`,(err, rows)=>{
    // console.log(rows);
    if(!err){
      db.all('SELECT * from Contacts',(err, rowsContact)=>{
        // res.render('editProfiles',{NamaContacts:rowsContact,dataJsonProfiles:rows});
        res.render('editAddresses_with_contact',{dataJsonAddresses:rows, NamaContacts:rowsContact});
      })
    }
    
  });
});

//HASIL EDIT DATA ADDRESS WITH CONTACTS
app.post('/addresses_with_contact/edit/:id', (req, res) => {
  // UPDATE table-name SET column-name = value, column-name = value,WHERE condition
  let str = "UPDATE Addresses set ContactsId = '"+req.body.name+"', street ='" +req.body.street+ "',";
  str += "city = '" +req.body.city+"',";
  str += "zipcode = '"+req.body.zipcode+"'";
  str += "WHERE id = "+req.param('id');
  db.all(str,(err, rows)=>{
    if(err){
      console.log(err);
    }else{
    res.redirect('../../addresses_with_contact');
    console.log(rows);
    }
  });
});

//HAPUS DATA ADDRESS WITH CONTACTS
app.get('/addresses_with_contact/delete/:id', (req, res) => {
  db.all(`DELETE from Addresses WHERE id = "${req.param('id')}"`,(err, rows)=>{
    console.log(err);
    res.redirect('../../addresses_with_contact');
  });
});

// SELECT pid, cid, pname, name1, name2 
// FROM TABLE1 c1, product p 
// WHERE p.cid=c1.cid 
// UNION SELECT pid, cid, pname, name1, name2 
// FROM TABLE2 c2, product p 
// WHERE p.cid=c2.cid;

// customer1 table
// cid name1
// 1   john
// 2   joe

// customer2 table
// cid name2
// p1  sandy
// p2  linda

// product table
// pid cid pname
// 1   1   phone
// 2   2   pencil
// 3   p1  pen
// 4   p2  paper

// Result should be like this

// pid  cid  pname  name1 name2
// 1    1    phone  john  NULL
// 2    2    pencil joe   NULL
// 3    p1   pen    NULL  sandy
// 4    p2   paper  NULL  linda

app.listen(3000, () => {
  console.log('Membuka port 3000!');
});