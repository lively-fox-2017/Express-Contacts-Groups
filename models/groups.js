const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/database.db')

class Group {
  constructor() {

  }

  static getDataGroup(callback) {
    db.all(`SELECT * FROM Groups`, (err,rows) => {
      if (!err) {
        callback(rows)
      } else {
        console.log(err);
      }
    })
  }

  static addDataGroup(param,callback) {
    db.run(`INSERT INTO Groups (name_of_group)
    VALUES ('${param.name_of_group}')`, (err) => {
      if (!err) {
        callback()
      } else {
        console.log(err);
      }
    })
  }

  static deleteDataGroup(param,callback) {
    db.run(`DELETE FROM Groups WHERE id = ${param}`, (err,rows) => {
      if (!err) {
        callback(rows)
      } else {
        console.log(err);
      }
    })
  }

  static findDataById(param, callback) {
    db.all(`SELECT * FROM Groups WHERE id = ${param}`, (err,rows) => {
      if (!err) {
        callback(rows)
      } else {
        console.log(err);
      }
    })
  }

  static editDataGroup(body,param, callback) {
    db.run(`UPDATE Groups SET
    name_of_group ='${body.name_of_group}' WHERE id='${param}'`, (err) => {
        if (!err) {
          callback()
        } else {
          console.log(err)
        }
      })
    }

}

module.exports = Group
