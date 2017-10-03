var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/database.db');
class ContactsGroups {
  constructor() {

  }
  static findAll(cb){
    db.all(`SELECT a.id,a.groupId as groupId,b.name as name_of_contact,c.name FROM ContactsGroups a, groups b, contacts c WHERE a.groupId=b.id AND  a.contactId=c.id ORDER BY b.name`,(err,data)=>{
      cb(err,data);
    });
  }
  static insertData(data,cb){
    db.run(`INSERT INTO ContactsGroups (ContactId,GroupId) VALUES (${data.contactId},${data.groupId})`,function(err,result){
      cb(err,result);
    });
  }
  static findByGroupId(groupId,cb){
    db.all(`SELECT a.id as ContactGroupId,a.contactId as contactId,b.name as name_of_contact,c.name,c.company,c.email FROM ContactsGroups a, groups b, contacts c WHERE a.groupId=b.id AND  a.contactId=c.id AND a.groupId=${groupId} ORDER BY b.name`,(err,data)=>{
      cb(err,data);
    });
  }
  static deleteData(params,cb){
    db.run(`DELETE FROM ContactsGroups WHERE id=${params.ContactGroupId}`,function(err,result){
      cb(err,result);
    });
  }
}

module.exports = ContactsGroups
