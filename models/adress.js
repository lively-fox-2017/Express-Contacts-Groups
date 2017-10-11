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
  static findAll() {
    var promise = new Promise((resolve, reject) => {
      db.all('select * from adresses', function(err, rows) {
        var objRows = rows.map((row) => {
          return new Adresses(row)
        });
        if (err) {
          reject(err);
        } else {
          resolve(objRows);
        }
      });
    });
    return promise;
  }
  static findById(id) {
    var promise = new Promise((resolve, reject) => {
      db.get('select * from adresses where id="' + id + '"', function(err, rows) {
        if (err) {
          reject(err);
        } else {
          if (rows !== undefined) {
            var objRows = new Adresses(rows);
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
      db.all(`select * from adresses where ${column}='${id}'`, function(err, rows) {
        if (err) {
          reject(err);
        } else {
          if (rows !== undefined) {
            var objRows = rows.map((row) => {
              return new Adresses(row)
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
      }
      db.run(`insert into adresses values(null, ${column.join(', ')})`, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    })
    return promise;
  }
  static editData(data) {
    var promise = new Promise((resolve, reject)=>{
      var sqlQ = "update Adresses set ";
      sqlQ += "street = '" + data.street + "', "
      sqlQ += "city = '" + data.city + "', "
      sqlQ += "zipcode = '" + data.zipcode + "', "
      sqlQ += "Contact_ID = '" + data.contact_id + "' "
      sqlQ += "where id='" + data.id + "'";
      db.run(sqlQ, function(err) {
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
  static deleteData(id) {
    var promise = new Promise((resolve, reject) => {
      db.run('delete from Adresses where id="' + id + '"', function(err) {
        if(err){
          reject(err);
        }
        else{
          resolve();
        }
      })
    })
    return promise;
  }
}

module.exports = Adresses;
