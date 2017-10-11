var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

class Groups{
  constructor(inputGroups){
    this.id = inputGroups.id;
    this.name_of_group = inputGroups.name_of_group
  }

  static getAllGroups(){
    return new Promise((resolve, reject)=>{
      db.all('SELECT * from Groups',(err, rows)=>{
        if(!err){
          let hasil = []
          rows.forEach((dataGroups)=> {
            hasil.push(new Groups({
              id : dataGroups.id,
              name_of_group : dataGroups.name_of_group
            }))
          }, this);
            resolve(hasil);
        } else {
          reject(err)
        }
      });
    })
  }

  static addGroups(dataGroups){
    return new Promise((resolve, reject)=>{
      db.run(`INSERT into Groups (name_of_group) VALUES ('${dataGroups.nama_group}')`,(err)=>{
        if(!err){resolve(null);} else {reject(err);}
      })
    })
  }

  static getIdGroups(id){
    return new Promise((resolve, reject)=>{
      db.get(`SELECT * from Groups WHERE id = "${id}"`,(err, rowsGroups)=>{
        if(!err){resolve(rowsGroups);} else {reject(err);}  
      });
    })
  }

  static processEditGroups(id, dataGroups){
    return new Promise((resolve, reject)=>{
      let str = `UPDATE Groups set name_of_group ='${dataGroups.nama_group}' WHERE id = '${id}'`;
      db.all(str,(err, rows)=>{
        if(!err){resolve(rows)}else{reject(err)};
      });
    })
    
  }

  static  deleteGroups(id){
    return new Promise((resolve, reject)=>{
      db.all(`DELETE from Groups WHERE id = "${id}"`,(err, rows)=>{
        if(!err){resolve(rows)}else{reject(err)};
      });
    })
    
  }
}
module.exports = Groups; 