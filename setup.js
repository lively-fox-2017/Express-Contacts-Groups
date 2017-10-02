const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');

db.serialize((err, rows) => {
  db.run('CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, company TEXT, telp_number TEXT, email TEXT)');
	if (err) {
	  console.log('Error create table contacts!');
	}
	  console.log('Table contacts created!!');

  db.run('CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group TEXT)');
	if (err) {
	  console.log('Error create table groups!');
	}
	  console.log('Table groups created!!');

  db.run('CREATE TABLE IF NOT EXISTS profile (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)');
	if (err) {
	  console.log('Error create table profile!');
	}
	  console.log('Table profile created!!');

  db.run('CREATE TABLE IF NOT EXISTS addresses (id INTEGER PRIMARY KEY AUTOINCREMENT, street TEXT, city TEXT, zipcode INTEGER)');
	if (err) {
	  console.log('Error create table addresses!');
	}
	  console.log('Table addresses created!!');
  
  // db.run('ALTER TABLE profile ADD id_contacts INTEGER REFERENCES contacts(id)');
  //   if (err) {
  //     console.log('Error alter table profile');
  //   }
  //     console.log('Alter table profile success');

  // db.run('CREATE UNIQUE INDEX id_contacts ON profile (id_contacts)');
  //   if (err) {
  //     console.log('Error create unique index');
  //   }
  //     console.log('Create unique index success');

//   db.run('ALTER TABLE addresses ADD id_contacts INTEGER REFERENCES contacts(id)');
//     if (err) {
//       console.log('Error alter table addresses');
//     }
//       console.log('Alter table addresses success');
});