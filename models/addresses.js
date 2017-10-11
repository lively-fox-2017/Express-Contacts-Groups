var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/database.db');

class Address {
  constructor() {

  }

  static findAll() {
    let promise = new Promise(function(resolve,reject) {
      db.all(`SELECT * FROM Addresses`, (err,dataAddress) => {
        if (!err) {
          resolve(dataAddress)
        } else {
          reject(err)
        }
      })
    })
    return promise
  }

  static findById(req) {
    let promise = new Promise(function(resolve,reject) {
      db.all(`SELECT * FROM Addresses WHERE id = ${req.params.id}`, (err,dataAddress) => {
        if (!err) {
          resolve(dataAddress)
        } else {
          reject(err)
        }
      })
    })
    return promise
  }

  static createAddress(req) {
    let promise = new Promise(function(resolve,reject) {
      db.run(`INSERT INTO Addresses (street,city,zipcode,id_contacts)
      VALUES ('${req.body.street}','${req.body.city}','${req.body.zipcode}','${req.body.id_contacts}')`, (err,dataAddress) => {
        if (!err) {
          resolve(dataAddress)
        } else {
          reject(err)
        }
      })
    })
    return promise
  }

  static deleteAddress(req) {
    let promise = new Promise(function(resolve,reject) {
      db.run(`DELETE FROM Addresses WHERE id = ${req.params.id}`, (err,dataAddress) => {
        if (!err) {
          resolve(dataAddress)
        } else {
          reject(err)
        }
      })
    })
    return promise
  }

  static updateAddress(req) {
    let promise = new Promise(function(resolve,reject) {
      db.run(`UPDATE Addresses SET street = '${req.body.street}', city = '${req.body.zipcode}',
      zipcode = '${req.body.zipcode}', id_contacts = '${req.body.id_contacts}' WHERE id = ${req.params.id}`, (err,dataAddress) => {
        if (!err) {
          resolve(dataAddress)
        } else {
          reject(err)
        }
      })
    })
    return promise
  }

}

module.exports = Address
