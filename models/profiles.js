var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/database.db');

class Profile {
  constructor() {

  }

  static findAll() {
    let promise = new Promise(function(resolve,reject) {
      db.all(`SELECT * FROM Profiles`, (err,dataProfile) => {
        if (!err) {
          resolve(dataProfile)
        } else {
          reject(err)
        }
      })
    })
    return promise
  }

  static findById(req) {
    let promise = new Promise(function(resolve,reject) {
      db.all(`SELECT * FROM Profiles WHERE id = ${req.params.id}`, (err,dataProfile) => {
        if (!err) {
          resolve(dataProfile)
        } else {
          reject(err)
        }
      })
    })
    return promise
  }

  static createProfile(req) {
    let promise = new Promise(function(resolve,reject) {
      db.run(`INSERT INTO Profiles (username,password,id_contacts)
      VALUES ('${req.body.username}','${req.body.password}','${req.body.id_contacts}')`, (err,dataProfile) => {
        if (!err) {
          resolve(dataProfile)
        } else {
          reject(err)
        }
      })
    })
    return promise
  }

  static deleteProfile(req) {
    let promise = new Promise(function(resolve,reject) {
      db.run(`DELETE FROM Profiles WHERE id = ${req.params.id}`, (err,dataProfile) => {
        if (!err) {
          resolve(dataProfile)
        } else {
          reject(err)
        }
      })
    })
    return promise
  }

  static updateProfile(req) {
    let promise = new Promise(function(resolve,reject) {
      db.run(`UPDATE Profiles SET username = '${req.body.username}', password = '${req.body.password}',
      id_contacts = '${req.body.id_contacts}' WHERE id = ${req.params.id}`, (err,dataProfile) => {
        if (!err) {
          resolve(dataProfile)
        } else {
          reject(err)
        }
      })
    })
    return promise
  }

}

module.exports = Profile
