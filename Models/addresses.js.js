var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/data.db');


class Addresses {
  constructor() {

  }

  static findAll(params){
    return new Promise((resolve, reject)=>{
      db.al('SELECT * FROM addresses WHERE ContactsID = ${params.id}', (err, dataAddresses)=>{
        if(!err){
          resolve(dataAddresses);
        }else{
          reject(err);
        }
      })
    })
  }


}


  //
  // static findAll(){
  //   return new Promise((resolve, reject)=>{
  //     db.all('SELECT * FROM contacts',(err,row)=>{
  //       if(!err){
  //         resolve(row);
  //       }else{
  //         reject(err);
  //       }
  //     })
  //   })
  // }
