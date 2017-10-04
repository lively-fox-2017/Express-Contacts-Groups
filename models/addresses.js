const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');
const modelsContacts = require('../models/contacts')

class Addresses {
  constructor() {
  }
  static findAll(cb){
    db.all('SELECT * FROM addresses ORDER BY street',function(err,data){
      // let newAddresses=new Addresses(data);
      cb(err,data);
    });
  }
  static insertData(data,cb){
    db.run(`INSERT INTO addresses (street,city,zipcode,contactId) VALUES ('${data.street}','${data.city}',${data.zipcode},${data.contactId})`,function(err,result){
      cb(err,result)
    });
  }
  static deleteData(params,cb){
    db.run(`DELETE FROM addresses WHERE id=${params.id}`,function(err,result){
      cb(err,result)
    });
  }
  static findById(id,cb){
    db.each(`SELECT * FROM addresses WHERE id=${id}`,function(err,data){
      cb(err,data);
    });
  }
  static findBy(param,cb){
    db.all(`SELECT * FROM addresses WHERE ${param}`,function(err,data){
      cb(err,data);
    });
  }
  static updateData(data,params,cb){
    db.run(`UPDATE addresses SET street='${data.street}',city='${data.city}',zipcode=${data.zipcode}, contactId=${data.contactId} WHERE id=${params.id}`,function(err,data){
      cb(err,result)
    });
  }
  static findContact(dataAddress,cb){
    if (dataAddress.length==0) {
      cb([])
    } else {
      let count=0;
      dataAddress.forEach((data)=>{
        modelsContacts.findById(data.contactId,(err,rows)=>{
          data["name"]=rows.name;
          data["company"]=rows.company;
          count++;
          if (count==dataAddress.length) {
            cb(dataAddress);
          }
        })
      })
    }
  }
}

module.exports = Addresses
