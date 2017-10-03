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
  static findAll(cb) {
    db.all('select * from contacts', function(err, rows){
      var objRows = rows.map((row) => { return new Contact(row) });
      cb(err, objRows);
    });
  }
  static findById(id, cb) {
    db.get('select * from contacts where id="'+id+'"', function(err, rows){
      cb(err, rows);
    })
  }
  static insertData(data, cb) {
    var column = [];
    for(let prop in data){
      column.push("'"+data[prop]+"'");
    }
    db.run(`insert into contacts values(null, ${column.join(', ')})`, function(err){
      cb(err, this.lastID);
    });
  }
  static editData(data, cb) {
    var sqlQ = "update Contacts set ";
    sqlQ += "name = '" + data.name + "', "
    sqlQ += "company = '" + data.company + "', "
    sqlQ += "telp_number = '" + data.telp_number + "', "
    sqlQ += "email = '" + data.email + "' "
    sqlQ += "where id='" + data.id + "'";
    db.run(sqlQ, function(err) {
      cb(err);
    });
  }
  static deleteData(id, cb) {
    db.run('delete from Contacts where id="'+id+'"', function(err){
      cb(err);
    })
  }
}

module.exports = Contact;
