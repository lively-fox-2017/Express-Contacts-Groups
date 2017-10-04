var sqlite3 = require('sqlite3')
var db = new sqlite3.Database('data/data.db')


db.serialize((err,rows)=> {
  db.run('CREATE TABLE IF NOT EXISTS Contacts ( id  INTEGER primary key AUTOINCREMENT  , name TEXT, company TEXT, telp_number TEXT, email TEXT)')
  if(err){
    console.log('erorr')
  }else {
    console.log('Table Contacts OK')
  }

  db.run('CREATE TABLE IF NOT EXISTS Groups ( id INTEGER primary key AUTOINCREMENT , name_of_group TEXT)')
  if(err){
    console.log('erorr')
  }else {
    console.log('Table Groups OK')
  }

  db.run('CREATE TABLE IF NOT EXISTS Profiles ( id INTEGER primary key AUTOINCREMENT , username TEXT, password TEXT)')
  if(err){
    console.log('erorr')
  }else {
    console.log('Table Profiles OK')
  }

  db.run('CREATE TABLE IF NOT EXISTS Addresses ( id INTEGER primary key AUTOINCREMENT , street TEXT, city TEXT, zipcode INTEGER)')
  if(err){
    console.log('erorr')
  }else {
    console.log('Table Addresses OK')
  }
  //


  db.run(`CREATE UNIQUE INDEX ContactsId ON Profiles(ContactsID)`, ()=>{
    console.log('jadi');
  })
})

// tambah record
db.run('INSERT INTO Contacts (name, company, telp_number, email) VALUES ("azharie", "Hacktive8", 08123, "azharie@mail.com" )')

db.run('INSERT INTO Contacts (name, company, telp_number, email) VALUES ("hari", "Hacktiv8", 08123, "azharie@mail.com" )')

db.run('INSERT INTO Groups (name_of_group) VALUES ("PAMERI")')

db.run('INSERT INTO Addresses (street, city, zipcode) VALUES ("Jl. Pondok Indah", "Jakarta Selatan", 97128)')
