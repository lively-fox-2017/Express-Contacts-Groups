const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');
const modelsContacts = require('../models/contacts');

class ContactsGroups {
  constructor() {

  }
  static findAll(cb){
    db.all(`SELECT * FROM ContactsGroups`,(err,data)=>{
      if (data.length==0) {
        cb(err,data)
      } else {
        let length=data.length-1
        // console.log('test select all contactsGroups',data.length);
        var count = 0
        data.forEach((temp)=>{
          modelsContacts.findById(temp.ContactId,(err,rows)=>{
            temp["name"]=rows.name;
            temp["company"]=rows.company;
            temp["email"]=rows.email;
            count++
            if(count == data.length) {
              cb(err,data);
            }
          })
        })
      }
    });
  }
  static insertData(data,cb){
    db.run(`INSERT INTO ContactsGroups (ContactId,GroupId) VALUES (${data.contactId},${data.groupId})`,function(err,result){
      cb(err,result);
    });
  }
  static findByGroupId(groupId,cb){
    db.all(`SELECT * FROM ContactsGroups WHERE GroupId=${groupId}`,(err,data)=>{
      if (data.length==0) {
        cb(err,data)
      } else {
        var count=0;
        data.forEach((temp)=>{
          modelsContacts.findById(temp.ContactId,(err,rows)=>{
            temp["name"]=rows.name;
            temp["company"]=rows.company;
            temp["email"]=rows.email;
            count++;
            if (count==data.length) {
              cb(err,data);
            }
          })
        })
      }
    });
  }
  static deleteData(params,cb){
    db.run(`DELETE FROM ContactsGroups WHERE id=${params.ContactGroupId}`,function(err,result){
      cb(err,result);
    });
  }
}

module.exports = ContactsGroups
