var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/database.db');

db.serialize(() => {
  // db.run(`CREATE TABLE IF NOT EXIST Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT,
  //   name VARCHAR(100), company VARCHAR(50), telp VARCHAR(20), email VARCHAR(50) )`, (err) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log('Create Table Contacts Berhasil');
  //     }
  //   });
  // db.run(`CREATE TABLE IF NOT EXIST Groups (id INTEGER PRIMARY KEY AUTOINCREMENT,
  //   name_of_group VARCHAR(100) )`, (err) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log('Create Table Groups Berhasil');
  //     }
  //   });
  // db.run(`CREATE TABLE IF NOT EXIST Profiles (id INTEGER PRIMARY KEY AUTOINCREMENT,
  //   username VARCHAR(100), password VARCHAR(50) )`, (err) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log('Create Table Profiles Berhasil');
  //     }
  //   });
  // db.run(`CREATE TABLE IF NOT EXIST Addresses (id INTEGER PRIMARY KEY AUTOINCREMENT,
  //   street VARCHAR(100), city VARCHAR(50), zipcode VARCHAR(15) )`, (err) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log('Create Table Addresses Berhasil');
  //     }
  //   });
  db.run(`ALTER TABLE Profiles ADD COLUMN id_contacts INTEGER REFERENCES Contacts(id)`, () => {
    console.log('Create Alter Table Profiles Berhasil');
  })
  db.run(`CREATE UNIQUE INDEX ContactsId ON Profiles(id_contacts)`, () => {
    console.log('CREATE UNIQUE BERHASIL');
  })
  db.run(`ALTER TABLE Addresses ADD COLUMN id_contacts INTEGER REFERENCES Contacts(id)`, () => {
    console.log('Create Alter Table Addresses Berhasil');
  })
  // db.run(`CREATE TABLE IF NOT EXIST ContactGroups (id INTEGER PRIMARY KEY AUTOINCREMENT,
  //   id_contacts INTEGER, id_groups INTEGER,
  //   FOREIGN KEY (id_contacts) REFERENCES Contacts(id),
  //   FOREIGN KEY (id_groups) REFERENCES Groups(id) )`, (err) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //     console.log('Create Conjuction Table Berhasil');
  //     }
  //   })
})
