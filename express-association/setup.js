const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/data.db')

function createTableContacts(){

  let query = `CREATE TABLE Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50),
    company VARCHAR(50),
    telp_number VARCHAR(50),
    email VARCHAR(50)
  )`

  db.run(query, function(err){
    if(!err){
      console.log(`Create table contacts berhasil!`)
    }
  })

}

function createTableProfiles(){

  let query = `CREATE TABLE Profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    contact_id INTEGER UNIQUE,
    username VARCHAR(50),
    password VARCHAR(50),
    FOREIGN KEY (contact_id) REFERENCES Contacts (id)
  )`

  db.run(query, function(err){
    if(!err){
      console.log(`Create table profiles berhasil!`)
    }
  })

}

function createTableAddresses(){

  let query = `CREATE TABLE Adresses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    street VARCHAR(50),
    city VARCHAR(50),
    zipcode VARCHAR(50)
  )`

  db.run(query, function(err){
    if(!err){
      console.log(`Create table addresses berhasil!`)
    }
  })

}

function createTableGroups(){

  let query = `CREATE TABLE Groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name_of_group VARCHAR(50)
  )`

  db.run(query, function(err){
    if(!err){
      console.log(`Create table groups berhasil!`)
    }
  })

}

function createTableGroupContact(){

  let query = `CREATE TABLE GroupsContacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    contact_id INTEGER,
    group_id INTEGER,
    FOREIGN KEY (contact_id) REFERENCES Contacts (id),
    FOREIGN KEY (group_id) REFERENCES Groups (id)
  )`

  db.run(query, function(err){
    if(!err){
      console.log(`Create table groupcontact berhasil!`)
    }
  })

}

function addContactID(){

  let query = `ALTER TABLE Adresses ADD COLUMN contact_id REFERENCES Contacts(id)`

  db.run(query, function(err){
    if(!err){
      console.log(`Add contact_id berhasil!`)
    }
  })

}

function renameTableUsers(){

  let query = `ALTER TABLE Users RENAME TO Contacts`

  db.run(query, function(err){
    if(!err){
      console.log(`Rename table berhasil!`)
    }
  })

}

function renameTableAdresses(){

  let query = `ALTER TABLE ADRESSES RENAME TO Addresses`

  db.run(query, function(err){
    if(!err){
      console.log(`Rename table addresses berhasil!`)
    }
  })

}

function deleteContactID(){

  let query = `DELETE FROM Groups `

}

// createTableGroupContact()
// createTableGroups()
// createTableContacts()
// createTableProfiles()
// createTableAddresses()
// addContactID()
// renameTableUsers()
// renameTableAdresses()
