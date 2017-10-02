var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/database.db');

class Group {
  constructor(){

  }

  static viewGroups(cb){
    db.all(`SELECT * FROM groups`,(err,rows)=>{
      cb(err,rows)
    })
  }

  static addGroups(data,cb){
    db.run(`INSERT INTO groups (name_of_group) VALUES ('${data.name_of_group}')`, function(){
      cb()
    })
  }

  static deleteGroups(data,cb){
    db.run(`DELETE FROM groups WHERE id='${data.id}'`, function(){
      cb()
    })
  }


  static geteditGroups(data,cb){
    db.all(`SELECT * FROM groups WHERE id='${data.id}'`, function(err,rows){
      cb(err,rows)
    })
  }

  static posteditGroups(data,params,cb){
    let query = `UPDATE groups SET name_of_group='${data.name_of_group}' WHERE id='${params.id}'`
    db.run(query, function(err){
      cb(err)
    })
  }

}



module.exports = Group
