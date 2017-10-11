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
  static findAll() {
    var promise = new Promise((resolve, reject) => {
      db.all('select * from profile', function(err, rows) {
        if (err) {
          reject(err);
        } else {
          if (rows !== undefined) {
            var objRows = rows.map((row) => {
              return new Profile(row)
            });
            resolve(objRows);
          } else {
            resolve(rows);
          }
        }
      });
    })
    return promise;
  }
  static findById(id) {
    var promise = new Promise((resolve, reject) => {
      db.get('select * from profile where id="' + id + '"', function(err, rows) {
        if (err) {
          reject(err);
        } else {
          if (rows !== undefined) {
            var objRows = new Profile(rows);
            resolve(objRows);
          } else {
            resolve(rows);
          }
        }
      });
    })
    return promise;
  }
  static findBy(id, column) {
    var promise = new Promise((resolve, reject) => {
      db.all(`select * from profile where ${column}='${id}'`, function(err, rows) {
        if (err) {
          reject(err);
        } else {
          if (rows !== undefined) {
            var objRows = rows.map((row) => {
              return new Profile(row)
            });
            resolve(objRows)
          } else {
            resolve(rows);
          }
        }
      });
    })
    return promise;
  }
  static insertData(data) {
    var promise = new Promise((resolve, reject)=>{
      var column = [];
      for (let prop in data) {
        column.push("'" + data[prop] + "'");
      }
      db.run(`insert into profile values(null, ${column.join(', ')})`, function(err) {
        if(err) {
          reject(err);
        }
        else {
          resolve(this.id);
        }
      });
    })
    return promise;
  }
  static editData(data) {
    var promise = new Promise((resolve, reject)=>{
      var sqlQ = "update Profile set ";
      sqlQ += "username = '" + data.username + "', "
      sqlQ += "password = '" + data.password + "', "
      sqlQ += "Contact_ID = '" + data.contact_id + "' "
      sqlQ += "where id='" + data.id + "'";
      db.all(sqlQ, function(err) {
        if(err) {
          reject(err)
        }
        else{
          resolve()
        }
      });
    })
    return promise;
  }
  static deleteData(id) {
    var promise = new Promise((resolve, reject)=>{
      db.run('delete from Profile where id="' + id + '"', function(err) {
        if(err) {
          reject(err);
        }
        else {
          resolve();
        }
      })
    })
    return promise;
  }
}

module.exports = Profile;
