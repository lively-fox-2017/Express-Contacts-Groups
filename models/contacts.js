var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/database.db');

class Contact {
  constructor() {

  }

  static findAll() {
    let promise = new Promise(function(resolve,reject) {
      db.all(`SELECT * FROM Contacts`, (err,dataContact) => {
        if (!err) {
          resolve(dataContact)
        } else {
          reject(err)
        }
      })
    })
    return promise
  }

  static findById(req) {
    let promise = new Promise(function(resolve,reject) {
      db.all(`SELECT * FROM Contacts WHERE id = ${req.params.id}`, (err,dataContact) => {
        if (!err) {
          resolve(dataContact)
        } else {
          reject(err)
        }
      })
    })
    return promise
  }

  static createContact(req) {
    let promise = new Promise(function(resolve,reject) {
      db.run(`INSERT INTO Contacts (name,company,telp,email)
      VALUES ('${req.body.name}','${req.body.company}','${req.body.telp}','${req.body.email}')`, (err,dataContact) => {
        if (!err) {
          resolve(dataContact)
        } else {
          reject(err)
        }
      })
    })
    return promise
  }

  static deleteContact(req) {
    let promise = new Promise(function(resolve,reject) {
      db.run(`DELETE FROM Contacts WHERE id = ${req.params.id}`, (err,dataContact) => {
        if (!err) {
          resolve(dataContact)
        } else {
          reject(err)
        }
      })
    })
    return promise
  }

  static updateContact(req) {
    let promise = new Promise(function(resolve,reject) {
      db.run(`UPDATE Contacts SET name = '${req.body.name}', company = '${req.body.company}',
      telp = '${req.body.telp}', email = '${req.body.email}' WHERE id = ${req.params.id}`, (err,dataContact) => {
        if (!err) {
          resolve(dataContact)
        } else {
          reject(err)
        }
      })
    })
    return promise
  }

}

module.exports = Contact
