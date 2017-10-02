'use strict'
const express = require('express');
const bodyparser = require('body-parser');

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('contacts-groups.db');

let app = express();
app.set('view engine', 'ejs');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended:true
}));

app.get('/contacts', function(req, res){
  let query = 'select * from contacts;';
  let contacts = null;
  let groups = null;
  let counter =0;
  db.all(query,function(err, rows){
    contacts = rows;
    counter++;
    if(counter>1){
      res.render('./contacts',{contacts, groups});
    }
  });

  db.all('SELECT * FROM GROUPS;', function(err, rows){
    groups = rows;
    counter++;
    if(counter>1){
      res.render('./contacts', {contacts, groups});
    }
  });

}).
post('/contacts', function(req, res){
  let query = `insert into contacts (name, company, telp_number, email) values ('${req.body.name}', '${req.body.company}', '${req.body.telp_number}', '${req.body.email}');`;
  db.run(query, function(){});
  res.redirect('/contacts');
}).
get('/contacts/edit/:id', function(req, res){
  let query = `SELECT * FROM contacts where id=${req.params.id.slice(1,req.params.id.length)};`;
  db.all(query,
  function(err, rows){
    res.render('./contacts-edit.ejs',{contact:rows[0]});
  });
}).
post('/contacts/edit/:id', function(req, res){
  let query = `UPDATE contacts SET name='${req.body.name}', company='${req.body.company}', telp_number='${req.body.telp_number}', email='${req.body.email}' WHERE id=${req.params.id.slice(1,req.params.id.length)};`;
  db.run(query, function(){});
  res.redirect('/contacts');
}).
get('/contacts/delete/:id', function(req, res){
  //res.send(`${req.params.id}`);
  db.run(`delete from contacts where id=${req.params.id.slice(1,req.params.id.length)};`);
  res.redirect('/contacts');
}).
get('/groups', function(req, res){
  let query = 'select * from groups;';
  db.all(query,function(err, rows){
    res.render('./groups',{groups:rows, err:err});
  })
}).
post('/groups', function(req, res){
  let query = `INSERT INTO groups (name_of_group) VALUES ('${req.body.name_of_group}');`;
  db.run(query, function(){});
  res.redirect('/groups');
}).
get('/groups/edit/:id', function(req, res){
  let query = `SELECT * FROM groups where id=${req.params.id.slice(1,req.params.id.length)};`;
  db.all(query,
  function(err, rows){
    res.render('./groups-edit.ejs',{groups:rows[0]});
  });
}).
post('/groups/edit/:id', function(req, res){
  let query = `UPDATE groups SET name_of_group='${req.body.name_of_group}' WHERE id=${req.params.id.slice(1,req.params.id.length)};`;
  db.run(query, function(){});
  res.redirect('/groups');
}).
get('/groups/delete/:id', function(req, res){
  db.run(`delete from groups where id=${req.params.id.slice(1,req.params.id.length)};`);
  res.redirect('/groups');
});

//==================++++++++++++++++++++-------------------@@@@@@@@@@@@@@@@@@@@@@@@@@###########

app.get('/addresses', function(req, res){
  let addressesDetails = null;
  let contactsDetails = null;
  let counter = 0;
  let query = 'select addresses.id, name, street, city, zipcode from addresses join contacts on contact_id = contacts.id;';
  db.all(query,function(err, rows){
    addressesDetails = rows;
    counter+=1;
    if (counter>1){
      res.render('./addresses',{addresses:addressesDetails, contacts:contactsDetails});
    }
  });
  db.all('select id, name from contacts;',function(err, rows){
    contactsDetails = rows;
    counter+=1;
    if(counter>1){
      res.render('./addresses',{addresses:addressesDetails, contacts:contactsDetails});
    }
  });
}).
get('/addresses/:id', function(req, res){
  let query = `select name, company, street, city, zipcode, contact_id from addresses, contacts where contact_id='${req.params.id}' and contacts.id='7';`;
  db.all(query, function(err, rows){
    if(rows.length>0){
      res.render('./addresses-personal.ejs', {addresses:rows});
    }else{
      db.all(`select name, company from contacts where id=${req.params.id};`,function(err,rows){

        res.render('./addresses-personal.ejs', {addresses:rows});
      });
    }
  });
}).
post('/addresses', function(req, res){
  console.log(req.body);
  let query = `INSERT INTO addresses (street, city, zipcode, contact_id) VALUES ('${req.body.street}', '${req.body.city}', '${req.body.zipcode}', '${req.body.contact_id}');`;
  db.run(query, function(){});
  res.redirect('/addresses');
}).
get('/addresses/edit/:id', function(req, res){
  let query = `SELECT * FROM addresses where id=${req.params.id.slice(1,req.params.id.length)};`;
  db.all(query,
  function(err, rows){
    res.render('./addresses-edit.ejs',{addresses:rows[0]});
  });
}).
post('/addresses/edit/:id', function(req, res){
  console.log(req.params);
  let query = `UPDATE addresses SET street='${req.body.street}', city='${req.body.city}', zipcode='${req.body.zipcode}' WHERE id=${req.params.id.slice(1,req.params.id.length)};`;
  db.run(query, function(){});
  res.redirect('/addresses');
}).
get('/addresses/delete/:id', function(req, res){
  db.run(`delete from addresses where id=${req.params.id.slice(1,req.params.id.length)};`);
  res.redirect('/addresses');
}).
get('/profiles', function(req, res){
  let query = 'SELECT profiles.id, username, password, name FROM profiles LEFT OUTER JOIN contacts ON contacts.id = profiles.contact_id;';
  let counter = 0;
  let profiles = null;
  let contacts = null;
  db.all(query,function(err, rows){
    counter+=1;
    profiles = rows;
    if(counter>1){
      res.render('./profiles',{profiles, contacts});
    }
  });
  query = 'SELECT id, name FROM CONTACTS;';
  db.all(query,function(err, rows){
    counter+=1;
    contacts = rows;
    if(counter>1){
      res.render('./profiles',{profiles, contacts});
    }
  });
}).
post('/profiles', function(req, res){
  //if(req.body.contact_id)
  db.all(`SELECT contact_id FROM profiles WHERE contact_id = ${req.body.contact_id};`, function(err, rows){
    //console.log(rows);
    if(rows.length==0){
      let query = `INSERT INTO profiles (username, password, contact_id) VALUES ('${req.body.username}', '${req.body.password}', '${req.body.contact_id}');`;
      db.run(query, function(){});
    }
    res.redirect('/profiles');
  });

}).
get('/profiles/edit/:id', function(req, res){
  let query = `SELECT * FROM profiles where id=${req.params.id.slice(1,req.params.id.length)};`;
  db.all(query,
  function(err, rows){
    res.render('./profiles-edit.ejs',{profiles:rows[0]});
  });
}).
post('/profiles/edit/:id', function(req, res){
  console.log(req.params);
  let query = `UPDATE profiles SET username='${req.body.username}', password='${req.body.password}' WHERE id=${req.params.id.slice(1,req.params.id.length)};`;
  db.run(query, function(){});
  res.redirect('/profiles');
}).
get('/profiles/delete/:id', function(req, res){
  db.run(`delete from profiles where id=${req.params.id.slice(1,req.params.id.length)};`);
  res.redirect('/profiles');
})


app.listen(3000);
