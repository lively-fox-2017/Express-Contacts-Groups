const sqlite3 = require('sqlite3').verbose();
var databasePath = require('../connection.js')
const db = new sqlite3.Database(databasePath);

class Contact {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.company = data.company;
    this.telp_number = data.telp_number;
    this.email = data.email;
  }
  static findAll() {
    var obj_promise = new Promise((resolve, reject) => {
      db.all('select * from contacts', function(err, rows) {
        var objRows = rows.map((row) => {
          return new Contact(row)
        });
        if (err) {
          reject(err);
        } else {
          resolve(objRows);
        }
      });
    })
    return obj_promise;
  }
  static findById(id) {
    var promise = new Promise((resolve, reject) => {
      db.get('select * from contacts where id="' + id + '"', function(err, rows) {
        if (err) {
          reject(err);
        } else {
          if (rows != undefined) {
            var objRows = new Contact(rows);
            resolve(objRows);
          } else {
            resolve(rows);
          }
        }
      })
    })
    return promise;
  }
  static insertData(data) {
    var promise = new Promise((resolve, reject) => {
      var column = [];
      for (let prop in data) {
        column.push("'" + data[prop] + "'");
      }
      db.run(`insert into contacts values(null, ${column.join(', ')})`, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    })
    return promise;
  }
  static editData(data, cb) {
    var promise = new Promise((resolve, reject) => {
      var sqlQ = "update Contacts set ";
      sqlQ += "name = '" + data.name + "', "
      sqlQ += "company = '" + data.company + "', "
      sqlQ += "telp_number = '" + data.telp_number + "', "
      sqlQ += "email = '" + data.email + "' "
      sqlQ += "where id='" + data.id + "'";
      db.run(sqlQ, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    })
    return promise;
  }
  static deleteData(id) {
    var promise = new Promise((resolve, reject) => {
      db.run('delete from Contacts where id="' + id + '"', function(err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      })
    })
    return promise;
  }
}

module.exports = Contact;
