const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');
const modelsContacts = require('../models/contacts')
class Profiles {
  constructor() {

  }
  static findAll(){
    return new Promise(function(resolve,reject){
      db.all('SELECT * FROM profiles ORDER BY username',(err,data)=>{
        if (!err) {
          resolve(data)
        } else {
          reject(err)
        }
      });
    })
  }
  static findById(id){
    return new Promise(function(resolve,reject){
      db.each(`SELECT * FROM profiles WHERE id=${id}`,(err,data)=>{
        if (true) {
          resolve(data);
        } else {
          reject(err);
        }
      })
    })
  }
  static findBy(param){
    return new Promise(function(resolve,reject){
      db.all(`SELECT * FROM profiles WHERE ${param}`,(err,data)=>{
        if (!err) {
          resolve(data)
        } else {
          reject(err)
        }
      });
    })
  }
  static insertData(data){
    // console.log(data);
    return new Promise (function(resolve,reject){
      db.run(`INSERT INTO profiles (username,password,contactId) VALUES ('${data.username}','${data.password}',${data.contactId})`,function(err,result){
        if (!err) {
          resolve(this)
        } else {
          reject(err)
        }
      })
    })
  }
  static deleteData(params){
    return new Promise(function(resolve,reject){
      db.run(`DELETE FROM profiles WHERE id=${params.id}`,function(err,result){
        if (!err) {
          resolve(this)
        } else {
          reject(err)
        }
      });
    })
  }
  static updateData(data,params){
    return new Promise(function(resolve,reject){
      console.log(params);
      db.run(`UPDATE profiles SET username='${data.username}',password='${data.password}',contactId='${data.contactId}' WHERE id=${params.id}`,function(err,result){
        if (!err) {
          console.log('asdfa');
          resolve(this)
        } else {console.log('asdfs');
          reject(err)
        }
      });
    })
  }
  static findContact(dataProfile){
    return new Promise(function(resolve,reject){
      if (dataProfile.length==0) {
        resolve([])
      } else {
        let count=0;
        dataProfile.forEach((data)=>{
          modelsContacts.findById(data.contactId,(err,rows)=>{
            if (!err) {
              data["name"]=rows.name;
              data["company"]=rows.company;
              count++;
              if (count==dataProfile.length) {
                resolve(dataProfile);
              }
            } else {
              reject(err)
            }
          })
        })
      }
    })
  }
}

module.exports = Profiles
