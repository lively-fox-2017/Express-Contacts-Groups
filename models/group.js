var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/database.db');

class Group {
  constructor(){

  }

  static findAll(){
    let getAll = new Promise((resolve,reject)=>{
      db.all(`SELECT * FROM groups `, function(err,dataGroups){
        if(!err){
          resolve(dataGroups)
        } else {
          reject(err)
        }
      })
    })
    return getAll
  }

  static findById(req){
    let findId = new Promise((resolve,reject)=>{
      db.all(`SELECT * FROM groups WHERE id = ${req.params.id}`, (err,dataGroups)=>{
        if(!err){
          resolve(dataGroups)
        } else {
          reject(err)
        }
      })
    })
    return findId
  }

  static add(req){
    let add = new Promise((resolve,reject)=>{
      db.run(`INSERT INTO groups (name_of_group) VAlUES ('${req.body.name_of_group}')`, (err,dataGroups)=>{
        if(!err){
          resolve(dataGroups)
        } else {
          reject(err)
        }
      })
    })
    return add
  }

  static delete(req){
    let del = new Promise((resolve,reject)=>{
      db.run(`DELETE FROM groups WHERE id = '${req.params.id}'`, (err,dataGroups)=>{
        if(!err){
          resolve(dataGroups)
        } else {
          reject(err)
        }
      })
    })
    return del
  }

  static edit(req){
    let upd = new Promise((resolve,reject)=>{
      db.run(`UPDATE groups SET name_of_group='${req.body.name_of_group}' WHERE id = '${req.params.id}'`, function(err,dataGroups){
        if(!err){
          resolve(dataGroups)
        }else {
          reject(err)
        }
      })
    })
    return upd
  }

}



module.exports = Group
