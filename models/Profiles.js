let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('data.db');

class Profiles{
  constructor(){
      // this.id = data_profile.id;
      // this.username = data_profile.username;
      // this.password =  data_profile.password;
      // this.nama = data_profile.nama;
  }
  getDataProfiles(){
    return new Promise((resolve, reject)=>{
      let query = `SELECT Profile.id,
      Profile.username,
      Profile.password,
      Contacts.nama from 
      Profile LEFT JOIN 
      Contacts ON 
      Profile.ContactsId = Contacts.id`;
        db.all(query,(err, rows)=>{
        if(!err){
          db.all('SELECT * from Contacts',(err, rowsContact)=>{
          let objProfiles = {
            rows:rows,
            rowsContact:rowsContact
          }
          resolve(objProfiles);
            });
        } else {
          reject(err)
        }
        });
    })
    
  } 

  insertDataProfiles(params){
    return new Promise((resolve, reject)=>{
      db.run(`INSERT into Profile 
      (username, password , ContactsId) VALUES 
      ('${params.username}',
       '${params.password}',
       '${params.name}')`,(err)=>{
        if(err){reject(err)}else {resolve(null)}
      })
    })  
  }

  editDataProfiles(id){
    return new Promise((resolve, reject)=>{
      db.get(`SELECT * from Profile WHERE id = "${id}"`,(err, rowProfile)=>{
        if(!err){
          db.all('SELECT * from Contacts',(err, rowContact)=>{
            let objeditedProfiles={
              rowProfile:rowProfile,
              rowContact:rowContact
            }
            resolve(objeditedProfiles)
          })
        } else {
          reject(err);
        }
      });
    })
  }

  hasilEditProfiles(id, dataBody){
    return new Promise((resolve, reject)=>{
      let str = `UPDATE Profile set ContactsId = '${dataBody.name}',
      username ='${dataBody.username}',
      password = '${dataBody.password}'
      WHERE id = '${id}'`;
        db.all(str,(err, rows)=>{
          if(err){reject(null, err);} else{resolve(rows, null);}
        });
    })
    
  }

  hapusProfile(id){
    return new Promise((resolve, reject)=>{
      db.all(`DELETE from Profile WHERE id = "${id}"`,(err, rows)=>{
        if(err){reject(err);}else{resolve(rows)};
      });
    })
  }
}

module.exports = Profiles;