var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/database.db');

class Conjunction {
  constructor(){

  }
  static addGroupsToContact(){
    let query = `SELECT groups.*,contacts.name FROM groups LEFT JOIN contacts_groups ON groups.id = contacts_groups.idGroups LEFT JOIN contacts ON contacts_groups.idContacts=contacts.id`
    db.run(query,(err,row)=>{
      cb(err,row)
    })
  }

}
