const sqlite3 = require('sqlite3').verbose();
var databasePath = require('../connection.js')
const db = new sqlite3.Database(databasePath);

class Adresses {
  constructor(data) {
    this.id = data.id;
    this.street = data.street;
    this.city = data.city;
    this.zipcode = data.zipcode;
    this.Contact_ID = data.Contact_ID;
  }
  static findAll(cb) {
    db.all('select * from adresses', function(err, rows) {
      var objRows = rows.map((row) => {
        return new Adresses(row)
      });
      cb(err, objRows);
    });
  }
  static findById(id, cb) {
    db.get('select * from adresses where id="' + id + '"', function(err, rows) {
      cb(err, rows);
    });
  }
  static findBy(id, column, cb) {
    db.all(`select * from adresses where ${column}='${id}'`, function(err, rows) {
      cb(err, rows);
    });
  }
  static insertData(data, cb) {
    var column = [];
    for (let prop in data) {
      column.push("'" + data[prop] + "'");
    }
    db.run(`insert into adresses values(null, ${column.join(', ')})`, function(err) {
      cb(err, this.lastID);
    });
  }
  static editData(data, cb) {
    var sqlQ = "update Adresses set ";
    sqlQ += "street = '" + data.street + "', "
    sqlQ += "city = '" + data.city + "', "
    sqlQ += "zipcode = '" + data.zipcode + "', "
    sqlQ += "Contact_ID = '" + data.contact_id + "' "
    sqlQ += "where id='" + data.id + "'";
    db.run(sqlQ, function(err) {
      cb(err);
    });
  }
  static deleteData(id, cb) {
    db.run('delete from Adresses where id="' + id + '"', function(err) {
      cb(err);
    })
  }
}

module.exports = Adresses;
