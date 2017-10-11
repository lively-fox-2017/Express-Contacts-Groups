const sqlite3 = require('sqlite3').verbose();
var databasePath = require('../connection.js')
const db = new sqlite3.Database(databasePath);

class Contact_Groups {
  constructor(data) {
    this.id = data.id;
    this.Contact_ID = data.Contact_ID;
    this.Group_ID = data.Group_ID;
  }
  static findBy(id, column) {
    var obj_promise = new Promise((resolve, reject) => {
      db.all(`select * from Contact_Groups where ${column}='${id}'`, function(err, rows) {
        if (err) {
          reject(err);
        } else {
          if (rows != undefined) {
            var objRows = rows.map((row) => {
              return new Contact_Groups(row)
            });
            resolve(objRows);
          } else {
            resolve(rows);
          }
        }
      });
    })
    return obj_promise;
  }
  static insertData(data) {
    var promise = new Promise((resolve, reject) => {
      var column = [];
      for (let prop in data) {
        column.push("'" + data[prop] + "'");
      }
      db.run(`insert into Contact_Groups values(null, ${column.join(', ')})`, function(err) {
        if(err){
          reject(err);
        }
        else{
          resolve();
        }
      });
    })
    return promise;
  }
}

module.exports = Contact_Groups;
