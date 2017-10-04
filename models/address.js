var sqlite3= require ('sqlite3');
var db=new sqlite3.Database('./db/database.db')
const express=require('express')
const router=express.Router()

class Address {
  constructor() {

  }

  static findAll(){
    let promise=new Promise(function(resolve,reject){
      db.all(`Select * from Addresses`,(err,dataAddres)=>{
        // console.log(dataAddres);
        if(!err){
          resolve(dataAddres)
        }else{
          reject(err)
        }
      })
    })
    return promise
  }
  static postInsert(req){
    let promise= new Promise (function (resolve,reject){
      db.run(`insert into Addresses (street,city,zipcode,idContacts) values
      ('${req.body.street}',
      '${req.body.city}',
      '${req.body.zipcode}',
      '${req.body.idContacts}')`,(err,dataAddres)=>{
        if(!err){
          resolve (dataAddres)
        }else{
          reject(err)
        }
      })
    })
    return promise
  }


  static getEdit(req){
    let promise = new Promise ((resolve,reject)=>{
      db.all(`select * from Addresses where id=${req.params.id}`,(err,dataAddres)=>{
        if(!err){
          resolve(dataAddres)
        }else{
          reject(err)
        }
      })
    })
    return promise
  }
  static postEdit(req){
    let promise=new Promise((resolve,reject)=>{
      db.run(`update Addresses set
        street='${req.body.street}',
        city='${req.body.city}',
        zipcode='${req.body.zipcode}',
        idContacts='${req.body.idContacts}'
        where id=${req.params.id}`,(err,dataAddress)=>{
          if(!err){
            resolve(dataAddress)
          }else{
            reject(err)
          }
        })
    })
      return promise
  }

  static getDelete(){

  }
}


module.exports = Address;
