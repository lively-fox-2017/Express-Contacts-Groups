var sqlite3= require ('sqlite3');
var db=new sqlite3.Database('./db/database.db')
const express=require('express')
const router=express.Router

class Profile {
  constructor() {

  }

  static findAll(){
    let promise=new Promise(function(resolve,reject){
      db.all(`Select * from Profiles`,(err,dataProfile)=>{
        // console.log(dataProfile);
        if(!err){
          resolve(dataProfile)
        }else{
          reject(err)
        }
      })
    })
    return promise
  }

  static findById(){
    let promise=new Promise(function(resolve, reject) {
      db.all(`select * from Profiles where id={req.params.id}`,(err,dataProfile)=>{
        if(!err){
          resolve(dataProfile)
        }else{
          reject(err)
        }
      })
    })
    return promise
  }

  static postInsert(req){
    let promise= new Promise (function (resolve,reject){
      db.run(`insert into Profiles (username,password,Contactsid) values
      ('${req.body.username}',
      '${req.body.password}',
      '${req.body.Contactsid}')`,(err)=>{
        if(!err){
          resolve ()
        }else{
          reject(err)
        }
      })
    })
    return promise
  }


  static getEdit(req){
    let promise = new Promise ((resolve,reject)=>{
      db.all(`select * from Profiles where id=${req.params.id}`,(err,dataProfile)=>{
        if(!err){
          resolve(dataProfile)
        }else{
          reject(err)
        }
      })
    })
    return promise
  }
  static postEdit(req){
    let promise=new Promise((resolve,reject)=>{
      db.run(`update Profiles set
        username='${req.body.username}',
        password='${req.body.password}'
        // Contactsid='${req.body.Contactsid}'
        where id=${req.params.id}`,(err)=>{
          if(!err){
            resolve()
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


module.exports = Profile;
