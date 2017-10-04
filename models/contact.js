var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/database.db');

class Contacts {
  constructor(){

  }

  static findAll(){
    let getAll = new Promise((resolve,reject)=>{
      db.all(`SELECT * FROM contacts`, (err,contacts)=>{
        if(!err){
          resolve(contacts)
        }else {
          reject(err)
        }
      })
    })
    return getAll
  }

  static findById(req){
    let findId = new Promise((resolve,reject)=>{
      db.all(`SELECT * FROM contacts WHERE id = ${req.params.id}`, (err,dataContacts)=>{
        if(!err){
          resolve(dataContacts)
        } else {
          reject(err)
        }
      })
    })
    return findId
  }

  static add(req){
    let add = new Promise((resolve,reject)=>{
      db.run(`INSERT INTO contacts (name,company,telp_number,email) VAlUES ('${req.body.name}','${req.body.company}','${req.body.telp_number}','${req.body.email}')`, (err,dataContacts)=>{
        if(!err){
          resolve(dataContacts)
        } else {
          reject(err)
        }
      })
    })
    return add
  }

  static delete(req){
    let del = new Promise((resolve,reject)=>{
      db.run(`DELETE FROM contacts WHERE id = '${req.params.id}'`, function(err,dataContacts){
        if(!err){
          resolve(dataContacts)
        } else {
          reject(err)
        }
      })
    })
    return del
  }

  static edit(req){
    let upd = new Promise((resolve,reject)=>{
      db.run(`UPDATE contacts SET name='${req.body.name}',company='${req.body.company}',telp_number='${req.body.telp_number}',email='${req.body.email}' WHERE id = '${req.params.id}'`, function(err,dataContacts){
        if(!err){
          resolve(dataContacts)
        }else {
          reject(err)
        }
      })
    })
    return upd
  }

}


module.exports = Contacts
