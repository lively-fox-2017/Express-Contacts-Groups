const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/database.db')

class Contact {
  contructor() {

  }

  static getDataContacts(callback){
    db.all(`SELECT * FROM Contacts`, (err,rows) => {
      if (!err) {
        callback(rows)
      } else {
        console.log(err);
      }
    })
  }

  static addDataContact(param,callback) {
    db.run(`INSERT INTO Contacts (name,company,telp,email)
    VALUES ('${param.name}','${param.company}','${param.telp}','${param.email}')`, (err) => {
      if (!err) {
        callback()
      } else {
        console.log(err);
      }
    })
  }

  static deleteDataContact(param,callback) {
    db.run(`DELETE FROM Contacts WHERE id = ${param}`, (err,rows) => {
      if (!err) {
        callback(rows)
      } else {
        console.log(err);
      }
    })
  }

  static findDataById(param, callback) {
    db.all(`SELECT * FROM Contacts WHERE id = ${param}`, (err,rows) => {
      if (!err) {
        callback(rows)
      } else {
        console.log(err);
      }
    })
  }

  static editDataContact(body,param, callback) {
    db.run(`UPDATE Contacts SET
    name = '${body.name}',
    company = '${body.company}',
    telp = '${body.telp}',
    email ='${body.email}' WHERE id='${param}'`, (err) => {
            if (!err) {
                callback()
            } else {
                console.log(err)
            }
        })
  }

}

module.exports = Contact
