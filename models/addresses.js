const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');
const modelsContacts = require('../models/contacts')

class Addresses {
  constructor() {
  }
  static findAll(){
    return new Promise(function(resolve,reject){
      db.all('SELECT * FROM addresses ORDER BY street',function(err,data){
        if (!err) {
          resolve(data)
        } else{
          reject(err)
        }
      });
    })
  }
  static insertData(data){
    return new Promise(function(resolve,reject){
      db.run(`INSERT INTO addresses (street,city,zipcode,contactId) VALUES ('${data.street}','${data.city}',${data.zipcode},${data.contactId})`,function(err,result){
        if (!err) {
          resolve(this);
        } else {
          reject(err)
        }
      })
    })
  }
  static deleteData(params){
    return new Promise(function(resolve,reject){
      db.run(`DELETE FROM addresses WHERE id=${params.id}`,function(err,result){
        if (!err){
          resolve(this)
        } else {
          reject(err)
        }
      });
    })
  }
  static findById(id){
    return new Promise(function(resolve,reject){
      db.each(`SELECT * FROM addresses WHERE id=${id}`,function(err,data){
        if (!err) {
          resolve(data)
        } else {
          reject(err)
        }
      });
    })
  }
  static findBy(param,cb){
    return new Promise(function(resolve,reject){
      db.all(`SELECT * FROM addresses WHERE ${param}`,function(err,data){
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    });
  })
  }
  static updateData(data,params,cb){
    return new Promise(function(resolve,reject){
      db.run(`UPDATE addresses SET street='${data.street}',city='${data.city}',zipcode=${data.zipcode}, contactId=${data.contactId} WHERE id=${params.id}`,function(err,result){
        if (!err) {
          resolve(this)
        } else {
          reject(err)
        }
      })
    })
  }
  static findContact(dataAddress){
    return new Promise(function(resolve,reject){
      if (dataAddress.length==0) {
        resolve([])
      } else {
        let count=0;
        dataAddress.forEach((data)=>{
          modelsContacts.findById(data.contactId,(err,rows)=>{
            if (!err) {
              data["name"]=rows.name;
              data["company"]=rows.company;
              count++;
              if (count==dataAddress.length) {
                resolve(dataAddress);
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

module.exports = Addresses
