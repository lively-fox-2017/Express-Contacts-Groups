let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('data.db');

class Profiles{
  constructor(){
      // this.id = data_profile.id;
      // this.username = data_profile.username;
      // this.password =  data_profile.password;
      // this.nama = data_profile.nama;
  }
  getDataProfiles(cb){
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
          cb(rows, rowsContact);
          // console.log(rows);
        });
      }
    });
  } 

  insertDataProfiles(params, cb){
    db.run(`INSERT into Profile 
          (username, password , ContactsId) VALUES 
          ('${params.username}',
           '${params.password}',
           '${params.name}')`,(err)=>{
      if(err){
        cb(err)
      }else {
        cb(null)
      }
    })
  }

  editDataProfiles(id, cb){
    // console.log(id)
    db.get(`SELECT * from Profile WHERE id = "${id}"`,(err, rowProfile)=>{
      if(!err){
        db.all('SELECT * from Contacts',(err, rowContact)=>{
          cb(rowProfile, rowContact)
        })
      }
    });
  }

  hasilEditProfiles(id, dataBody, cb){
    //  console.log(id)
    let str = `UPDATE Profile set ContactsId = '${dataBody.name}',
              username ='${dataBody.username}',
              password = '${dataBody.password}'
              WHERE id = '${id}'`;
    db.all(str,(err, rows)=>{ 
      console.log('ini errr'+err)
      if(err){
        console.log("------",err)
        cb(null, err);
      } else{
        cb(rows, null);
        console.log(rows);
      }
    });
  }

  hapusProfile(id, cb){
  db.all(`DELETE from Profile WHERE id = "${id}"`,(err, rows)=>{
    if(err){console.log(err);}else{cb(err, rows)};
  });
  }

}

module.exports = Profiles;