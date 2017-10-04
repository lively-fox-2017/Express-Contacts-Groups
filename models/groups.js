const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');
const modelsContactsGroups = require('../models/contactsGroups');
const modelsContacts = require('../models/contacts');

class Groups {
  constructor() {

  }
  static findAll(){
    return new Promise(function(resolve,reject){
      db.all('SELECT * FROM groups ORDER BY name',function (err,data){
        if (!err) {
          resolve(data)
        } else {
          reject(err)
        }
      })
    })
  }
  static insertData(data){
    return new Promise(function(resolve,reject){
      db.run(`INSERT INTO groups (name) VALUES ('${data.name}')`,function(err,result){
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
      db.run(`DELETE FROM groups WHERE id=${params.id}`,function(err,result){
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
      db.each(`SELECT * FROM groups WHERE id=${id}`,(err,data)=>{
        if (!err) {
          resolve(data)
        } else {
          reject(err)
        }
      })
    })
  }
  static findBy(param){
    return new Promise(function(resolve,reject){
      db.all(`SELECT * FROM groups WHERE ${param}`,(err,data)=>{
        if (!err) {
          resolve(err)
        } else {
          reject(err)
        }
      })
    })
  }
  static updateData(data,params){
    return new Promise(function(resolve,reject){
      db.run(`UPDATE groups SET name='${data.name}' WHERE id=${params.id}`,function(err,result){
        if (!err) {
          resolve(this)
        } else {
          reject(err)
        }
      })
    })
  }
  static joinDataGroupsMembers(dataGroups,dataMembers){
    // console.log('data members',dataMembers);
    return new Promise(function(resolve,reject){
      let newData=dataGroups.map(x=>{
        x["members"]=[];
        // console.log(dataMembers.length);
        for (var i = 0; i < dataMembers.length; i++) {
          // console.log(dataMembers[i].GroupId,'==',x.id);
          if (dataMembers[i].GroupId==x.id){
            // console.log(dataMembers);
            x.members.push(dataMembers[i].name);
          }
        }
        return x
      })
      resolve(newData)
    })
  }
}

module.exports = Groups
