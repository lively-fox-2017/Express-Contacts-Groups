const sqlite3 = require('sqlite3').verbose();
var databasePath = require('../connection.js')
const db = new sqlite3.Database(databasePath);

class Profile {
  constructor(data) {
    this.id = data.id;
    this.username = data.username;
    this.password = data.password;
    this.Contact_ID = data.Contact_ID;
  }
  static findAll(cb) {
    db.all('select * from profile', function(err, rows) {
      cb(err, rows);
    });
  }
  static findById(id, cb) {
    db.get('select * from profile where id="' + id + '"', function(err, rows) {
      cb(err, rows);
    });
  }
  static findBy(id, column, cb) {
    db.all(`select * from profile where ${column}='${id}'`, function(err, rows) {
      cb(err, rows);
    });
  }
  static insertData(data, cb) {
    var column = [];
    for (let prop in data) {
      column.push("'" + data[prop] + "'");
    }
    db.run(`insert into profile values(null, ${column.join(', ')})`, function(err) {
      cb(err, this.lastID);
    });
  }
  static editData(data, cb) {
    var sqlQ = "update Profile set ";
    sqlQ += "username = '" + data.username + "', "
    sqlQ += "password = '" + data.password + "', "
    sqlQ += "Contact_ID = '" + data.contact_id + "' "
    sqlQ += "where id='" + data.id + "'";
    db.all(sqlQ, function(err) {
      res.redirect('../../profiles')
    });
  }
  static deleteData(id, cb) {
    db.run('delete from Profile where id="' + id + '"', function(err) {
      cb(err);
    })
  }
}

module.exports = Profile;
