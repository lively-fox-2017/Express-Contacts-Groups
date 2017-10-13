

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/data.db');


class Contact {
  constructor(){

  }

  static findAll(){
    return new Promise((resolve, reject)=>{
      db.all('SELECT * FROM contacts',(err,row)=>{
        if(!err){
          resolve(row);
        }else{
          reject(err);
        }
      })
    })
  }

  static findById(){
    return new Promise((resolve, reject)=>{
      db.each(`SELECT * FROM contacts WHERE id = ${id}`, (err, data)=> {
        if(!err){
          resolve(row)
        }
      })
    })

  }

  static create(body){
    return new Promise((resolve, reject)=>{
      db.run(`INSERT INTO contacts (name, company, telp_number, email) VALUES ("${body.name}", "${body.company}",
      "${body.telp_number}", "${body.email}")`, (err)=>{
        if(!err){
          resolve()
        }
      })
    })
  }

  static editById(params){
    return new Promise((resolve, reject)=>{
      db.each(`SELECT * FROM contacts WHERE id = ${params.id}`, (err,data)=>{
        if(!err){
          resolve(data)
        }
      })
    })
  }


  static updateCon(body, params){
    return new Promise ((resolve, reject)=>{
      db.run(`UPDATE contacts SET
        name = '${body.name}',
        company = '${body.company}',
        telp_number = '${body.telp_number}',
        email = '${body.email}' WHERE id = '${params.id}'`, (err)=>{
          if(!err){
            resolve()
          }
      })
    })

  }

  static deleteCon(params){
    return new Promise ((resolve, reject)=>{
      db.run(`DELETE FROM contacts WHERE id = ${params.id}`, (err)=>{
        if(!err){
          resolve()
        }
      })
    })
  }

}

module.exports = Contact
