var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/database.db');
const Contact = require('../models/contacts')
// const ContactGroup = require('../models/contactgroups')

class Group {
  constructor() {

  }

  static findAll() {
    let promise = new Promise(function(resolve,reject) {
      db.all(`SELECT * FROM Groups`, (err,dataGroup) => {
        if (!err) {
          resolve(dataGroup)
        } else {
          reject(err)
        }
      })
    })
    return promise
  }
  // static getDataGroup(row) {
  //   let promise = new Promise(function(resolve,reject) {
  //     db.all(`SELECT * FROM Groups`, (err,rowGroups) => {
  //       ContactGroup.findAll()
  //     })
  //   })
  // }

  static findById(req) {
    let promise = new Promise(function(resolve,reject) {
      db.all(`SELECT * FROM Groups WHERE id = ${req.params.id}`, (err,dataGroup) => {
        if (!err) {
          resolve(dataGroup)
        } else {
          reject(err)
        }
      })
    })
    return promise
  }

  static createGroup(req) {
    let promise = new Promise(function(resolve,reject) {
      db.run(`INSERT INTO Groups (name_of_group)
      VALUES ('${req.body.name_of_group}')`, (err,dataGroup) => {
        if (!err) {
          resolve(dataGroup)
        } else {
          reject(err)
        }
      })
    })
    return promise
  }

  static deleteGroup(req) {
    let promise = new Promise(function(resolve,reject) {
      db.run(`DELETE FROM Groups WHERE id = ${req.params.id}`, (err,dataGroup) => {
        if (!err) {
          resolve(dataGroup)
        } else {
          reject(err)
        }
      })
    })
    return promise
  }

  static updateGroup(req) {
    let promise = new Promise(function(resolve,reject) {
      db.run(`UPDATE Groups SET name_of_group = '${req.body.name_of_group}'
      WHERE id = ${req.params.id}`, (err,dataGroup) => {
        if (!err) {
          resolve(dataGroup)
        } else {
          reject(err)
        }
      })
    })
    return promise
  }

}

module.exports = Group
