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
  static findAll() {
    var promise = new Promise((resolve, reject) => {
      db.all('select * from groups', function(err, rows) {
        if (err) {
          reject(err);
        } else {
          if (rows.length == 0) {
            resolve(rows);
          } else {
            var objRows = rows.map((row) => {
              return new Group(row)
            });
            resolve(objRows);
          }
        }
      });
    })
    return promise;
  }
  static findById(id) {
    var obj_promise = new Promise((resolve, reject) => {
      db.get('select * from groups where id="' + id + '"', function(err, rows) {
        if (err) {
          reject(err);
        } else {
          if (rows != undefined) {
            var objRows = new Group(rows);
            resolve(objRows);
          } else {
            resolve(rows);
          }
        }
      });
    })
    return obj_promise
  }
  static findBy(id, column) {
    var promise = new Promise((resolve, reject) => {
      db.all(`select * from groups where ${column}='${id}'`, function(err, rows) {
        if (err) {
          reject(err);
        } else {
          if (rows !== undefined) {
            var objRows = rows.map((row) => {
              return Group(row)
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
  static insertData(data) {
    var promise = new Promise((resolve, reject) => {
      var column = [];
      for (let prop in data) {
        column.push("'" + data[prop] + "'");
      };
      db.run(`insert into groups values(null, ${column.join(', ')})`, function(err) {
        if (err) {
          reject(err);
        }
        else {
          resolve();
        };
      });
    })
    return promise;
  }
  static editData(data) {
    var promise = new Promise((resolve, reject) => {
      var sqlQ = "update Groups set ";
      sqlQ += "name_of_group = '" + data.name_of_group + "' "
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
      db.run('delete from Groups where id="' + id + '"', function(err) {
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

module.exports = Group;
