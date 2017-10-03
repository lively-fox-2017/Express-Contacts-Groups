const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/database.db')
const Contact = require('../models/contacts')

class Profile {
  contructor() {

  }

  // static getDataProfile(callback){
  //   db.all(`SELECT * FROM Profiles`, (err,rows) => {
  //     if (!err) {
  //       callback(rows)
  //     } else {
  //       console.log(err);
  //     }
  //   })
  // }

  static getDataProfile(callback){
    db.all(`SELECT Profiles.*, Contacts.name FROM Profiles LEFT JOIN Contacts ON Profiles.id_contacts = Contacts.id `, (errProfiles,rowProfiles) => {
      db.all(`SELECT * FROM Contacts`, (errContacts,rowContacts) => {
        if (!errContacts) {
          callback(rowProfiles,rowContacts)
        } else {
          console.log(errProfiles);
        }
      })
    })
  }

  static addDataProfile(param,callback) {
    db.run(`INSERT INTO Profiles (username,password,id_contacts)
    VALUES ('${param.username}','${param.password}', '${param.id_contacts}')`, (err) => {
      if (!err) {
        callback()
      } else {
        callback(err);
      }
    })
  }

  static deleteDataProfile(param,callback) {
    db.run(`DELETE FROM Profiles WHERE id = ${param}`, (err,rows) => {
      if (!err) {
        callback(rows)
      } else {
        console.log(err);
      }
    })
  }

  static findDataById(param, callback) {
    db.all(`SELECT Profiles.* FROM Profiles WHERE id = ${param}`, (err,rowProfiles) => {
      db.all(`SELECT * FROM Contacts`, (errContacts,rowContacts) => {
        if (!err) {
          callback(rowProfiles,rowContacts)
        } else {
          console.log(errContacts);
        }
      })
    })
  }

  static editDataProfile(body,param, callback) {
    db.run(`UPDATE Profiles SET
    username = '${body.username}',
    password ='${body.password}',
    id_contacts = '${body.id_contacts}' WHERE id='${param}'`, (err) => {
            if (!err) {
                callback()
            } else {
                callback(err);
            }
        })
  }

}

module.exports = Profile
