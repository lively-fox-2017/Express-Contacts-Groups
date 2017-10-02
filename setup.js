const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/data.db');

db.serialize(() => {

  db.run(`CREATE TABLE IF NOT EXISTS contacts (
	  id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
	  name	TEXT,
    company	TEXT,
	  telp_number	TEXT,
	  email	TEXT);`,() => {
    console.log(`Create Table Contacts Berhasil`);
  })

  db.run(`CREATE TABLE IF NOT EXISTS groups (
	  id INTEGER PRIMARY KEY AUTOINCREMENT,
	  name_of_group	TEXT);`,() => {
    console.log(`Create Table Groups Berhasil`);
  })

  db.run(`CREATE TABLE IF NOT EXISTS profiles (
	  id	INTEGER PRIMARY KEY AUTOINCREMENT,
	  username	TEXT,
	  password	TEXT);`,() => {
    console.log(`Create Table Profile Berhasil`);
  })

  db.run(`CREATE TABLE IF NOT EXISTS addresses (
	  id	INTEGER PRIMARY KEY AUTOINCREMENT,
	  street	TEXT,
	  city	TEXT,
	  zipcode	INTEGER);`,() => {
    console.log(`Create Table Profile Berhasil`);
  })

  db.run(`ALTER TABLE profiles ADD COLUMN idContacts INTEGER REFERENCES contacts(id)`, (err)=>{
    if (!err) {
      console.log(`ALTER Table Berhasil`);
    }
  })

  db.run(`CREATE UNIQUE INDEX idContacts ON profiles(idContacts)`, (err)=>{
    if (!err) {
      console.log(`Alter kedua Berhasil`);
    }else {
      console.log(err);
    }
  });

  db.run(`ALTER TABLE addresses ADD COLUMN idContacts REFERENCES contacts(id);`, (err)=>{
      if (!err) {
        console.log(`ALTER ketiga Berhasil`);
      }else {
        console.log(err);
      }
  })

  db.run(`CREATE TABLE IF NOT EXISTS contactGroup
    (id INTEGER PRIMARY KEY AUTOINCREMENT,
    idContacts INTEGER REFERENCES contacts(id),
    idGroups INTEGER REFERENCES groups(id))`,(err)=>{
    if (!err) {
      console.log(`CREATE Table contactGroup berhasil`);
    }else {
      console.log(err);
    }
  });


})
