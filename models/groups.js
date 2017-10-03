var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/database.db');

class Groups {
  constructor() {

  }
  static findAll(cb){
    db.all('SELECT * FROM groups ORDER BY name',function (err,data){
      cb(err,data);
    });
  }
  static insertData(data,cb){
    db.run(`INSERT INTO groups (name) VALUES ('${data.name}')`,function(err,result){
      cb(err,result)
    })
  }
  static deleteData(params,cb){
    db.run(`DELETE FROM groups WHERE id=${params.id}`,function(err,result){
      cb(err,result)
    });
  }
  static findById(id,cb){
    db.each(`SELECT * FROM groups WHERE id=${id}`,(err,data)=>{
      cb(err,data);
    });
  }
  static findBy(param,cb){
    db.all(`SELECT * FROM groups WHERE ${param}`,(err,data)=>{
      cb(err,data);
    });
  }
  static updateData(data,params,cb){
    db.run(`UPDATE groups SET name='${data.name}' WHERE id=${params.id}`,function(err,result){
      cb(err,result)
    });
  }
}

module.exports = Groups
