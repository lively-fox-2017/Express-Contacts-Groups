var sqlite3= require ('sqlite3');
var db=new sqlite3.Database('./db/database.db')
const express=require('express')
const router=express.Router

class Contact {
  constructor() {

  }

  static findAll(){
    let promise=new Promise(function(resolve,reject){
      db.all(`Select * from Contacts`,(err,dataContact)=>{
        // console.log(dataContact);
        if(!err){
          resolve(dataContact)
        }else{
          reject(err)
        }
      })
    })
    return promise
  }

  //find by id
  static findById(id){
    let promise=new Promise ((resolve,reject)=>{
      db.each(`select * from Contacts where id=${id}`,(err,dataContact)=>{
        ;
        if(!err){
          resolve(dataContact)
        }else{
          reject(err)
        }
      })
    })
    return promise
  }

  static postInsert(req){
    let promise= new Promise (function (resolve,reject){
      db.run(`insert into Contacts (name,company,telp_number,email) values
      ('${req.body.name}',
      '${req.body.company}',
      '${req.body.telp_number}',
      '${req.body.email}')`,(err,dataContact)=>{
        if(!err){
          resolve (dataContact)
        }else{
          reject(err)
        }
      })
    })
    return promise
  }


  static getEdit(req){
    let promise = new Promise ((resolve,reject)=>{
      db.all(`select * from Contacts where id=${req.params.id}`,(err,dataContact)=>{
        if(!err){
          resolve(dataContact)
        }else{
          reject(err)
        }
      })
    })
    return promise
  }
  static postEdit(req){
    let promise=new Promise((resolve,reject)=>{
      db.run(`update Contacts set
        name='${req.body.name}',
        company='${req.body.company}',
        telp_number='${req.body.telp_number}',
        email='${req.body.email}'
        where id=${req.params.id}`,(err,dataContact)=>{
          if(!err){
            resolve(dataContact)
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


module.exports = Contact;
