var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./db/data.db')

db.serialize(function () {
  db.run(`CREATE TABLE IF NOT EXISTS contacts
          (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR, company VARCHAR,
            telp VARCHAR,
            email VARCHAR
          )`, function(err){
    if(!err){
      console.log('table contacts berhasil dibuat');
    }
  });

  db.run(`CREATE TABLE IF NOT EXISTS groups
          (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name_of_group VARCHAR
          )`, function(err){
    if(!err){
      console.log('table groups berhasil dibuat');
    }
  })

  db.run(`CREATE TABLE IF NOT EXISTS addresses
          (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            street VARCHAR,
            city VARCHAR,
            zipcode VARCHAR,
            contactsId INTEGER,
            FOREIGN KEY(contactsId) REFERENCES contacts(id)
          )`, function(err){

              if(!err){
                console.log('table addresses berhasil dibuat');
              }
          })


})

db.run(`CREATE TABLE IF NOT EXISTS users
        (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username VARCHAR,
          password VARCHAR,
          contactsId INTEGER,
          FOREIGN KEY(contactsId) REFERENCES contacts(id)
        )`, function(err){
          if(!err){
            console.log('table user berhasil dibuat');
          }
        });

db.run(`CREATE TABLE IF NOT EXISTS usergroup
        (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          contactsId INTEGER,
          groupsId INTEGER,
          FOREIGN KEY(contactsId) REFERENCES contacts(id),
          FOREIGN KEY(groupsId) REFERENCES groups(id)
        )`, function(err){
          if(!err){
            console.log('table usergroup berhasil dibuat');
          }
        })



db.close()
