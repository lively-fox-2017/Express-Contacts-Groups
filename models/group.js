const sqlite3 = require('sqlite3').verbose();
const db= new sqlite3.Database ('db/database.db')

class Group {
  constructor() {

  }

  static findAll(cb){
    db.all("SELECT * FROM Groups",(err,row)=>{
      cb(row)
    })
  }
//pertama baca dulu si router trus apa yg dilempar ditangkap sama
  static insertDataGroup(body){
    db.run(`INSERT INTO Groups(name_of_group)VALUES('${body.name_of_group}')`)
    }

  static deleteDataGroup(params){
    db.run(`DELETE FROM Groups WHERE id =${params.id}`)
  }

  static getEditGroup(params,cb){
    db.all(`SELECT * FROM Groups WHERE id=${params}`,(err,row)=>{
      cb(row)
    })
  }

  static updateEditGroup(body,params,cb){
    db.run(`UPDATE Groups SET name_of_group = '${body.name_of_group}'
    WHERE id= ${params}`,(err)=>{
      if(!err){
        cb()
      }else{
        console.log(err);
      }
    })
  }
  static addressview(cb){

  }
}

module.exports = Group;
