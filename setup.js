var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/database.db');

db.serialize(()=> {
  db.run("CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, company TEXT, telp_number TEXT, email TEXT)");
  console.log('table Contacts created');
});

db.serialize(()=> {
  db.run("CREATE TABLE IF NOT EXISTS Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)");
  console.log('table Groups created');
});

db.serialize(()=> {
  db.run("CREATE TABLE IF NOT EXISTS ContactsGroups (id INTEGER PRIMARY KEY AUTOINCREMENT,ContactId INTEGER,GroupId INTEGER,FOREIGN KEY(contactId) REFERENCES Contacts(id),FOREIGN KEY(groupId) REFERENCES Groups(id))");
  console.log('table ContactsGroups created');
});

db.serialize(()=> {
  db.run("CREATE TABLE IF NOT EXISTS Profiles (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)");
  console.log('table Profiles created');
});

db.serialize(()=> {
  db.run("CREATE TABLE IF NOT EXISTS Addresses (id INTEGER PRIMARY KEY AUTOINCREMENT, street TEXT, city TEXT, zipcode INTEGER)");
  console.log('table Addresses created');
});

db.serialize(()=> {
  db.run("ALTER TABLE Profiles ADD COLUMN contactId INTEGER REFERENCES Contacts(id)");
  console.log('table Profiles altered');
});

db.serialize(()=> {
  db.run("ALTER TABLE Addresses ADD COLUMN contactId INTEGER REFERENCES Contacts(id)");
  console.log('table Addresses altered');
});
