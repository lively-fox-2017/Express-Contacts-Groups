var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/database.db');

class Profile {
  constructor(){

  }
  static viewProfiles(cb){
    let query = `SELECT profile.*, contacts.name FROM profile LEFT JOIN contacts ON contacts.id=profile.idContacts ORDER BY profile.id`
    db.all(query,function(err,rows){
      cb(err,rows)
    })
  }

  static addProfile(data,cb){
    db.run(`INSERT INTO profile (username,password,idContacts) VALUES ('${data.username}','${data.password}','${data.idContacts}')`, function(err){
      if(err){
        cb(err)
      } else{
        cb()
      }
    })
  }

  static deleteProfile(data,cb){
    db.run(`DELETE FROM profile WHERE id='${data.id}'`, function(){
      cb()
    })
  }

  static geteditProfiles(data,cb){
    let query = `SELECT * FROM profile where id=${data.id}`
    db.all(query, function(err,rows){
      cb(err,rows)
    })
  }

  static posteditProfiles(data,params,cb){
    let query = `UPDATE profile SET username='${data.username}',password='${data.password}',idContacts='${data.idContacts}' WHERE id='${params.id}'`
    db.run(query,function(err){
      cb(err)
    })
  }


}




module.exports = Profile
