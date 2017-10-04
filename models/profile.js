const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/database.db');

class Profile {
  constructor(){

  }

  static findAll(){
    let getAll = new Promise((resolve,reject)=>{
    db.all(`SELECT * FROM profiles`, function(err,dataProfiles){
      if(!err){
        resolve(dataProfiles)
      } else {
        reject(err)
      }
      })
    })
    return getAll;
  }

  static findById(req){
    let findId = new Promise((resolve,reject)=>{
      db.all(`SELECT * FROM profiles WHERE id='${req.params.id}'`, (err,dataProfiles)=>{
        if(!err){
          resolve(dataProfiles)
        } else {
          reject(err)
        }
      })
    })
    return findId
  }

  static add(req){
    let add = new Promise((resolve,reject)=>{
      db.run(`INSERT INTO profiles (username,password,idContacts) VALUES ('${req.body.username}','${req.body.password}','${req.body.idContacts}')`, (err,dataProfiles)=>{
        if(!err){
          resolve(dataProfiles)
        } else {
          reject(err)
        }
      })
    })
    return add;
  }

  static delete(req){
    let del = new Promise((resolve,reject)=>{
      db.run(`DELETE FROM profiles WHERE id='${req.params.id}'`, (err,dataProfiles)=>{
        if(!err){
          resolve(dataProfiles)
        } else {
          reject(err)
        }
      })
    })
    return del
  }

  static edit(req){
    let upd = new Promise((resolve,reject)=>{
      db.run(`UPDATE profiles SET username = '${req.body.username}', password = '${req.body.password}',idContacts = '${req.body.idContacts}'`, (err,dataProfiles)=>{
        if(!err){
          resolve(dataProfiles)
        } else {
          reject(err)
        }
      })
    })
    return upd
  }
}

module.exports = Profile
