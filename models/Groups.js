var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

class Groups{
  constructor(inputGroups){
    this.id = inputGroups.id;
    this.name_of_group = inputGroups.name_of_group
  }

  static getAllGroups(cb){
    db.all('SELECT * from Groups',(err, rows)=>{
      let hasil = []
      rows.forEach((dataGroups)=> {
        hasil.push(new Groups({
          id : dataGroups.id,
          name_of_group : dataGroups.name_of_group
        }))
      }, this);
        cb(err, hasil);
    });
  }

  static addGroups(dataGroups,cb){
    db.run(`INSERT into Groups (name_of_group) VALUES ('${dataGroups.nama_group}')`,(err)=>{
      if(!err){
        cb(null);
      } else {
        cb(err);
      }
    })
  }

  static getIdGroups(id, cb){
    db.get(`SELECT * from Groups WHERE id = "${id}"`,(err, rowsGroups)=>{
      if(!err){
        console.log(rowsGroups);
        cb(err, rowsGroups);
      } else {
        console.log(err);
      }  
    });
  }

  static processEditGroups(id, dataGroups, cb){
    let str = `UPDATE Groups set name_of_group ='${dataGroups.nama_group}' WHERE id = '${id}'`;
    db.all(str,(err, rows)=>{
      if(!err){cb(err, rows)}else{console.log(err)};
    });
  }

  static  deleteGroups(id ,cb){
    db.all(`DELETE from Groups WHERE id = "${id}"`,(err, rows)=>{
      if(!err){cb(err, rows)}else{console.log(err)};
    });
  }
}
module.exports = Groups; 