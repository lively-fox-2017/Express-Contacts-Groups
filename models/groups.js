var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/database.db');

class Group {
  constructor(){

  }

  static viewGroups(cb){
    db.all(`SELECT * FROM groups`,(err,rows)=>{
      db.all(`SELECT contacts_groups.*, contacts.name FROM contacts_groups LEFT JOIN contacts ON
        contacts_groups.idContacts = contacts.id`,(err,rowContactsGroups)=>{
        if(!err){
          let newData = rows.map(z=>{
            z["member"]=[]
          let temp = rowContactsGroups.map(y=>{
            if(z.id==y.idGroups){
              return z.member.push(y.name)
              }
            })
          return z
          })
          cb(err,newData)
        }
      })
    })
  }

  static addGroups(data,cb){
    db.run(`INSERT INTO groups (name_of_group) VALUES ('${data.name_of_group}')`, function(err){
      cb(err)
    })
  }

  static deleteGroups(data,cb){
    db.run(`DELETE FROM groups WHERE id='${data.id}'`, function(){
      cb()
    })
  }


  static geteditGroups(data,cb){
    db.all(`SELECT * FROM groups WHERE id='${data.id}'`, function(err,rows){
      // if(!err){
        cb(err,rows)
      // } else cb(err)
    })
  }

  static posteditGroups(data,params,cb){
    let query = `UPDATE groups SET name_of_group='${data.name_of_group}' WHERE id='${params.id}'`
    db.run(query, function(err){
      if(err){
        cb(err)
      }else {
        cb()
      }
    })
  }

}



module.exports = Group
