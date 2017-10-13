var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/database.db');

class Address {
  constructor(){

  }

  static findAll(){
    let getAll = new Promise((resolve,reject)=>{
      db.all(`SELECT * FROM addresses`, (err,address)=>{
        if(!err){
          resolve(address)
        }else {
          reject(err)
        }
      })
    })
    return getAll
  }

  static findById(req){
    let findId = new Promise((resolve,reject)=>{
      db.all(`SELECT * FROM addresses WHERE id = ${req.params.id}`, (err,dataAddress)=>{
        if(!err){
          resolve(dataAddress)
        } else {
          reject(err)
        }
      })
    })
    return findId
  }

  static add(req){
    let add = new Promise((resolve,reject)=>{
      db.run(`INSERT INTO addresses (street,city,zipcode,idContacts) VAlUES ('${req.body.street}','${req.body.city}','${req.body.zipcode}','${req.body.idContacts}')`, (err,dataAddress)=>{
        if(!err){
          resolve(dataAddress)
        } else {
          reject(err)
        }
      })
    })
    return add
  }

  static delete(req){
    let del = new Promise((resolve,reject)=>{
      db.run(`DELETE FROM addresses WHERE id = '${req.params.id}'`, function(err,dataAddress){
        if(!err){
          resolve(dataAddress)
        } else {
          reject(err)
        }
      })
    })
    return del
  }

  static edit(req){
    let upd = new Promise((resolve,reject)=>{
      db.run(`UPDATE addresses SET street='${req.body.street}',city='${req.body.city}',zipcode='${req.body.zipcode}',idContacts='${req.body.idContacts}' WHERE id = '${req.params.id}'`, function(err,dataAddress){
        if(!err){
          resolve(dataAddress)
        }else {
          reject(err)
        }
      })
    })
    return upd
  }

}


module.exports = Address
