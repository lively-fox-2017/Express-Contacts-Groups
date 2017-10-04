var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./db/dataCompany.db')

db.serialize(function () {
  db.run('CREATE TABLE IF NOT EXISTS contacs (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR, company VARCHAR, telp VARCHAR, email VARCHAR)', function(err){
    if(!err){
      console.log('table contacts berhasil dibuat');
    }
  });

  db.run('CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group VARCHAR)', function(err){
    if(!err){
      console.log('table groups berhasil dibuat');
    }
  })

  db.run('CREATE TABLE IF NOT EXISTS profiles (id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR, password VARCHAR)', function(err){
    if(!err){
      console.log('table profiles berhasil dibuat');
    }
  })

  db.run('CREATE TABLE IF NOT EXISTS addresses (id INTEGER PRIMARY KEY AUTOINCREMENT, street VARCHAR, city VARCHAR, zipcode VARCHAR)', function(err){
    if(!err){
      console.log('table addresses berhasil dibuat');
    }
  })

})

db.close()
