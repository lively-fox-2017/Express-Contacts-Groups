var sqlite3= require ('sqlite3');
var db=new sqlite3.Database('./db/database.db')
const express=require('express')
const router=express.Router

class Group {
  constructor() {
  }

  static findAll(){
    let promise=new Promise(function(resolve,reject){
      db.all(`Select * from Groups`,(err,dataGroup)=>{
        // console.log(dataGroup);
        if(!err){
          resolve(dataGroup)
        }else{
          reject(err)
        }
      })
    })
    return promise
  }
  static postInsert(req){
    let promise= new Promise (function (resolve,reject){
      db.run(`insert into Groups (name_of_group) values
      ('${req.body.name_of_group}')`,(err,dataGroup)=>{
        if(!err){
          resolve (dataGroup)
        }else{
          reject(err)
        }
      })
    })
    return promise
  }


  static getEdit(req){
    let promise = new Promise ((resolve,reject)=>{
      db.all(`select * from Groups where id=${req.params.id}`,(err,dataGroup)=>{
        if(!err){
          resolve(dataGroup)
        }else{
          reject(err)
        }
      })
    })
    return promise
  }
  static postEdit(req){
    let promise=new Promise((resolve,reject)=>{
      db.run(`update Groups set
        name_of_group='${req.body.name_of_group}'
        where id=${req.params.id}`,(err,dataGroup)=>{
          if(!err){
            resolve(dataGroup)
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


module.exports = Group;
