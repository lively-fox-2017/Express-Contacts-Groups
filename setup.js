const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');

function runSetup() {
  db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, company TEXT, telp_number TEXT, email TEXT)", function(err) {
      if (err !== null) {
        console.log('create Contacts',err);
      }
    });
    db.run("create table if not exists Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group TEXT)", function(err) {
      if (err !== null) {
        console.log('create Groups',err);
      }
    })
    db.run("create table if not exists Profile (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT)", function(err) {
      if (err !== null) {
        console.log('create Profile',err);
      }
    })
    db.run("create table if not exists Adresses (id INTEGER PRIMARY KEY AUTOINCREMENT, street TEXT, city TEXT, zipcode INTEGER)", function(err) {
      if (err !== null) {
        console.log('create Adresses',err);
      }
    })
  });

}

function addDummyContent() {
  db.run("insert into Contacts values(null,'tes','tes.corp','0811','tes@tes.tes')");
  db.run("insert into Contacts values(null,'tes2','tes2.corp','0812','tes2@tes2.tes2')");
  db.run("insert into Groups values(null, 'Group 1')")
  db.run("insert into Groups values(null, 'Group 2')")
  db.run("insert into Profile values(null,'username','password')");
  db.run("insert into Profile values(null,'user2','pass2')");
  db.run("insert into Adresses values(null,'jalan','kota',111)");
  db.run("insert into Adresses values(null,'nama jalan','nama kota',222)");
}

function addContactIDColumn() {
  db.run("alter table Adresses add column Contact_ID INTEGER REFERENCES Contacts(id)", (err) =>{
    if(err) {
      console.log(err);
    }
  });
}

runSetup();
// addUniqueConstraints()
addContactIDColumn();
// addDummyContent()
