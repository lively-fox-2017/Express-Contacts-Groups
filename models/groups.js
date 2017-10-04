const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');
const modelsContactsGroups = require('../models/contactsGroups');
const modelsContacts = require('../models/contacts');

class Groups {
  constructor() {

  }
  static findAll(cb){
    db.all('SELECT * FROM groups ORDER BY name',function (err,data){
      cb(err,data);
    });
  }
  static insertData(data,cb){
    db.run(`INSERT INTO groups (name) VALUES ('${data.name}')`,function(err,result){
      cb(err,result)
    })
  }
  static deleteData(params,cb){
    db.run(`DELETE FROM groups WHERE id=${params.id}`,function(err,result){
      cb(err,result)
    });
  }
  static findById(id,cb){
    db.each(`SELECT * FROM groups WHERE id=${id}`,(err,data)=>{
      cb(err,data);
    });
  }
  static findBy(param,cb){
    db.all(`SELECT * FROM groups WHERE ${param}`,(err,data)=>{
      cb(err,data);
    });
  }
  static updateData(data,params,cb){
    db.run(`UPDATE groups SET name='${data.name}' WHERE id=${params.id}`,function(err,result){
      cb(err,result)
    });
  }
  static joinDataGroupsMembers(dataGroups,dataMembers,cb){
    console.log('data members',dataMembers);
    let newData=dataGroups.map(x=>{
      x["members"]=[];
      // console.log(dataMembers.length);
      for (var i = 0; i < dataMembers.length; i++) {
        // console.log(dataMembers[i].GroupId,'==',x.id);
        if (dataMembers[i].GroupId==x.id){
          // console.log(dataMembers);
          x.members.push(dataMembers[i].name);
        }
      }
      return x
    })
    cb(newData);
    // let length=dataGroups.length-1;
    // let newData=[]
    // dataGroups.forEach((x,index)=>{
    //   x["members"]=[]
    //   for (var i = 0; i < dataMembers.length; i++) {
    //     // console.log(dataMembers[i].GroupId,'==',x.id);
    //     if (dataMembers[i].GroupId==x.id){
    //       // console.log(dataMembers);
    //       x.members.push(dataMembers[i].name);
    //     }
    //   }
    //   newData.push(x)
    //   if (index==length){
    //     console.log(newData);
    //     cb(newData);
    //   }
    // })
  }
}

module.exports = Groups
