const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');
const modelsContacts = require('../models/contacts')
class Profiles {
  constructor() {

  }
  static findAll(cb){
    db.all('SELECT * FROM profiles ORDER BY username',(err,data)=>{
      cb(err,data);
    });
  }
  static insertData(data,cb){
    console.log(data);
    db.run(`INSERT INTO profiles (username,password,contactId) VALUES ('${data.username}','${data.password}',${data.contactId})`,function(err,result){
      cb(err,result)
    });
  }
  static deleteData(params,cb){
    db.run(`DELETE FROM profiles WHERE id=${params.id}`,function(err,result){
      cb(err,result)
    });
  }
  static findById(id,cb){
    db.each(`SELECT * FROM profiles WHERE id=${id}`,(err,data)=>{
      cb(err,data);
    });
  }
  static findBy(param,cb){
    db.all(`SELECT * FROM profiles WHERE ${param}`,(err,data)=>{
      cb(err,data);
    });
  }
  static updateData(data,params,cb){
    db.run(`UPDATE profiles SET username='${data.username}',password='${data.password}',contactId='${data.contactId}' WHERE id=${params.id}`,function(err,result){
      cb(err,result)
    });
  }
  static findContact(dataProfile,cb){
    if (dataProfile.length==0) {
      cb([])
    } else {
      let count=0;
      dataProfile.forEach((data)=>{
        modelsContacts.findById(data.contactId,(err,rows)=>{
          data["name"]=rows.name;
          data["company"]=rows.company;
          count++;
          if (count==dataProfile.length) {
            cb(dataProfile);
          }
        })
      })
    }
  }
}

module.exports = Profiles
