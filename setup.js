const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db/database.db')

db.serialize(()=>{
  db.run(`CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT,
          name VARCHAR (100), company VARCHAR(255), tlp_number VARCHAR (50), email VARCHAR (100))`);
  db.run(`CREATE TABLE IF NOT EXISTS Profiles (id INTEGER PRIMARY KEY AUTOINCREMENT,
          username VARCHAR (100), password VARCHAR (100))`);
  db.run(`CREATE TABLE IF NOT EXISTS Address(id INTEGER PRIMARY KEY AUTOINCREMENT,
          street VARCHAR (255), city VARCHAR (255), zipcode VARCHAR (100))`);
  db.run(`CREATE TABLE IF NOT EXISTS Groups (id INTEGER PRIMARY KEY AUTOINCREMENT,
          names_of_groups VARCHAR(100))`);
  db.run(`ALTER TABLE Profiles ADD COLUMN id_contact INTEGER REFERENCES Contacts(id)`)
  db.run(`CREATE UNIQUE INDEX id_contact ON Profiles (id_contact)`)
  db.run(`ALTER TABLE Contacts ADD COLUMN id_address INTEGER REFERENCES Address(id)`)
  db.run(`ALTER TABLE Address ADD COLUMN id_contact INTEGER REFERENCES Contacts(id)`)
  db.run(`CREATE TABLE IF NOT EXISTS ContactGroups (id INTEGER PRIMARY KEY AUTOINCREMENT, id_contact INTEGER, id_group INTEGER)`)
});
