var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/data.db');

db.run('CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, company TEXT, telp_number TEXT UNIQUE, email TEXT UNIQUE)')
console.log('table contact created');

// function createContact() {
//   db.run("INSERT INTO Contacts VALUES (1, 'Ian', 'Hacktiv8', '0812999999', 'christian@yahoo.com')");
//
//   console.log('data created');
// }

db.run('CREATE TABLE IF NOT EXISTS Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group TEXT)');
console.log('table group created');

db.run('CREATE TABLE IF NOT EXISTS Profile (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT UNIQUE)');
console.log('table profile created');

db.run('CREATE TABLE IF NOT EXISTS Addresses (id INTEGER PRIMARY KEY AUTOINCREMENT, street TEXT, city TEXT, zipcode TEXT)');
console.log('table addresses created');

function alterContactsProfiles() {
  let add = `ALTER TABLE Profile ADD COLUMN ContactId INTEGER REFERENCES Contacts(id)`;
  db.run(add, (err) => {
    if (!err) {

    } else {
      console.log(err);
    }

  });
}

function alterUnique() {
  db.run(`CREATE UNIQUE INDEX contactId_unique ON Profile(ContactId)`, (err) => {
    if(!err) {console.log('tabel berhasil ditambah');}
    else {console.log(err);}
  })
}

function alterContactsAddresses() {
  let add = `ALTER TABLE Addresses ADD COLUMN ContactId INTEGER REFERENCES Contacts(id)`;
  db.run(add, (err) => {
    if (!err) {

    } else {
      console.log(err);
    }
  });
}

// alterUnique();
alterContactsAddresses();
// createContact();
