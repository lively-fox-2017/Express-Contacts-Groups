const sqlite3 = require('sqlite3').verbose();
var databasePath = require('../connection.js')
const db = new sqlite3.Database(databasePath);

class Contact_Groups {
  constructor() {

  }
  static findBy(id, column, cb) {
    db.all(`select * from Contact_Groups where ${column}='${id}'`, function(err, rows) {
      cb(err, rows);
    });
  }
  static insertData(data, cb) {
    var column = [];
    for(let prop in data){
      column.push("'"+data[prop]+"'");
    }
    db.run(`insert into Contact_Groups values(null, ${column.join(', ')})`, function(err){
      cb(err, this.lastID);
    });
  }
}

module.exports = Contact_Groups;
