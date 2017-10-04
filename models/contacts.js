var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/database.db');


class Contacts {
  constructor() {
  }
  static findAll(){
    return new Promise(function(resolve,reject){
      db.all('SELECT * FROM contacts ORDER BY name',function(err,data){
        // let newContact=new Contacts(data);
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    })
  }
  static insertData(data){
    return new Promise(function(resolve,reject){
      db.run(`INSERT INTO contacts (name,company,telp_number,email) VALUES ('${data.name}','${data.company}',
            '${data.telp_number}','${data.email}')`,function(err,result){
        if(!err){
          resolve(this)
        } else {
          reject(err)
        }
      })
    })
  }
  static deleteData(params){
    return new Promise(function(resolve,reject){
      db.run(`DELETE FROM contacts WHERE id=${params.id}`,function(err,result){
        if (!err) {
          resolve(this)
        } else {
          reject(err)
        }
      })
    })
  }
  static findById(id){
    return new Promise(function(resolve,reject){
      db.each(`SELECT * FROM contacts WHERE id=${id}`,function(err,data){
        if (!err) {
          resolve(data)
        } else {
          reject(err)
        }
      })
    })
  }
  static updateData(data,params){
    return new Promise(function(resolve,reject){
      db.run(`UPDATE contacts SET name='${data.name}',company='${data.company}',telp_number='${data.telp_number}',email='${data.email}' WHERE id=${params.id}`,function(err,result){
        if (!err) {
          resolve(this)
        } else {
          reject(err)
        }
      })
    })
  }
}

module.exports = Contacts
