
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/data.db');
const Contact = require('../Models/contacts')
let query1 = `SELECT Profiles.*, Contacts.name, Contacts.id as contactsId FROM Profiles LEFT JOIN Contacts ON Contacts.id = Profiles.ContactsID`
let query2 = `SELECT * FROM Contacts`

class Profile {
  static findAll(){
    return new Promise(function(resolve, reject) {
      db.all(query1, (err, dataProfiles)=>{
        if(!err){
          resolve(dataProfiles);
        }else{
            reject(err);
        }
      })
    })

  }

  static make(body){
    return new Promise((resolve, reject)=>{
      db.run(`INSERT INTO profiles ('username', 'password', ContactsID) VALUES ("${body.username}", "${body.password}", "${body.ContactsID}")`, (err, rowProfiles) => {
        Contact.findAll()
        .then((rowContact)=>{
         if(!err){
           resolve(err, rowProfiles, rowContact )
         }else {
           reject(err)
         }
       })
     })
    })

  }
  //

  static findById (params){
    return new Promise ((resolve, reject)=>{
      db.each(`SELECT * FROM profiles WHERE id =${params}`, (err, dataProfile)=>{
          if(!err){
          resolve(dataProfile)
          }else{
          reject(err)
        }
      })
    })

  }

  static updateProf(body, params){
    return new Promise ((resolve, reject)=>{
      db.run(`UPDATE profiles SET username = '${body.username}', 'password=${body.password}',      ContactsID='${body.ContactsID} WHERE id = '${params.id}'`, (err, data)=>{
        if(!err){
          resolve(dataProfile)
        }else{
          reject(err)
        }
      })
    })
  }

  static deleteProf(params){
    return new Promise((resolve, reject)=>{
      db.run(`DELETE FROM profiles WHERE id = ${params.id}`, (err)=>{
        if(!err){
          resolve(err)
        }
      })
    })
  }



}



  module.exports = Profile
