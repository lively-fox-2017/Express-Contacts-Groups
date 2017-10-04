const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');
const modelsContacts = require('../models/contacts');

class ContactsGroups {
  constructor() {

  }
  static findAll(){
    return new Promise(function(resolve,reject){
      db.all(`SELECT * FROM ContactsGroups`,(err,data)=>{
        if (data.length==0) {
          resolve(data)
        } else {
          // console.log('test select all contactsGroups',data.length);
          var count = 0
          data.forEach((temp)=>{
            modelsContacts.findById(temp.ContactId)
            .then((rows)=>{
              temp["name"]=rows.name;
              temp["company"]=rows.company;
              temp["email"]=rows.email;
              count++;
              if(count == data.length) {
                resolve(data);
              }
            })
            .catch((err)=>{
              reject(err);
            })
          })
        }
      })
    })
  }
  static insertData(data){
    return new Promise(function(resolve,reject){
      db.run(`INSERT INTO ContactsGroups (ContactId,GroupId) VALUES (${data.contactId},${data.groupId})`,function(err,result){
        if (!err) {
          resolve(this)
        } else {
          reject(err)
        }
      })
    })
  }
  static findByGroupId(groupId){
    return new Promise(function(resolve,reject){
      db.all(`SELECT * FROM ContactsGroups WHERE GroupId=${groupId}`,(err,data)=>{
        if (data.length==0) {
          resolve(data)
        } else {
          // console.log('test select all contactsGroups',data.length);
          var count = 0
          data.forEach((temp)=>{
            modelsContacts.findById(temp.ContactId)
            .then((rows)=>{
              temp["name"]=rows.name;
              temp["company"]=rows.company;
              temp["email"]=rows.email;
              count++;
              if(count == data.length) {
                resolve(data);
              }
            })
            .catch((err)=>{
              reject(err);
            })
          })
        }
      })
    })
  }
  static deleteData(params){
    return new Promise(function(resolve,reject){
      db.run(`DELETE FROM ContactsGroups WHERE id=${params.ContactGroupId}`,function(err,result){
        if ((!err)) {
          resolve(this)
        } else {
          reject(err)
        }
      })
    })
  }
}

module.exports = ContactsGroups
