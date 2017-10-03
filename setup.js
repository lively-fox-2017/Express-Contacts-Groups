var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/database.db');

db.serialize(function() {
  db.run(`CREATE TABLE contacts IF NOT EXISTS (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255),company VARCHAR(255),telp_number VARCHAR(255),email VARCHAR(255))`, () => {
    console.log('Table Contacts Berhasil Dibuat');
  });

  db.run(`CREATE TABLE groups IF NOT EXISTS (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group VARCHAR(255))`, () => {
    console.log('Table Groups Berhasil Dibuat');
  });

  db.run(`CREATE TABLE profile IF NOT EXISTS (id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR(255), password VARCHAR(255))`, () => {
    console.log('Table Profile Berhasil Dibuat');
  });

  db.run(`CREATE TABLE addresses IF NOT EXISTS (id INTEGER PRIMARY KEY AUTOINCREMENT, street VARCHAR(255), city VARCHAR(255), zipcode VARCHAR(255))`, () => {
    console.log('Table Addresses Berhasil Dibuat');
  });
});

function alterTabelProfiles() {
  let query = `ALTER TABLE profile ADD COLUMN idContacts INTEGER REFERENCES contacts(id)`
  db.run(query, function(err) {
    console.log('Alter Table Profiles Success');
  })
alterTabelProfiles()

function alterTabelAddresses() {
  let query = `ALTER TABLE addresses ADD COLUMN idContacts INTEGER REFERENCES contacts(id)`
  db.run(query, function(err) {
    console.log('Alter Table Addresses Success!');
  })
}
alterTabelAddresses()

function alterIndexUniqueProfiles() {
  let query = `CREATE UNIQUE INDEX idContacts ON profile(idContacts);`
  db.run(query, function(err) {
    console.log('Alter Unique Berhasil');
  })
}
alterIndexUniqueProfiles()

function conjunctionTable(){
  let query = `CREATE TABLE contacts_groups (id INTEGER PRIMARY KEY AUTOINCREMENT, idContacts INTEGER, idGroups INTEGER,
  FOREIGN KEY(idContacts) REFERENCES contacts(id), FOREIGN KEY (idGroups) REFERENCES groups(id))`
  db.run(query,function(err){
    if(err){
      console.log(err);
    }else {
      console.log('Conjunction Table Success');
    }
  })
}
conjunctionTable()
