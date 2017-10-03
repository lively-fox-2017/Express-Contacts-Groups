const sqlite3 = require('sqlite3').verbose();
var databasePath = require('../connection.js')
const db = new sqlite3.Database(databasePath);

class Group {
  constructor(data) {
    this.id = data.id;
    this.name_of_group = data.name_of_group;
  }
  cobaTambah() {
    var tes = this.id + this.name_of_group;
    return tes
  }
  static findAll(cb) {
    db.all('select * from groups', function(err, rows) {
      var objRows = rows.map((row) => {
        return new Group(row)
      });
      cb(err, objRows);
    });
  }
  static findById(id, cb) {
    db.get('select * from groups where id="' + id + '"', function(err, rows) {
      cb(err, rows);
    });
  }
  static findBy(id, column, cb) {
    db.all(`select * from groups where ${column}='${id}'`, function(err, rows) {
      cb(err, rows);
    });
  }
  static insertData(data, cb) {
    var column = [];
    for (let prop in data) {
      column.push("'" + data[prop] + "'");
    }
    db.run(`insert into groups values(null, ${column.join(', ')})`, function(err) {
      cb(err);
    });
  }
  static editData(data, cb) {
    var sqlQ = "update Groups set ";
    sqlQ += "name_of_group = '" + data.name_of_group + "' "
    sqlQ += "where id='" + data.id + "'";
    db.run(sqlQ, function(err) {
      cb(err);
    });
  }
  static deleteData(id, cb) {
    db.run('delete from Groups where id="' + id + '"', function(err) {
      cb(err);
    })
  }
}

module.exports = Group;
