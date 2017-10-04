var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/database.db');


class Contacts {
  constructor(data) {
    // this.id=data.id
    // this.name=data.name
    // this.company=data.company
    // this.telp_number=data.telp_number
    // this.email=data.email
  }
  static findAll(cb){
    db.all('SELECT * FROM contacts ORDER BY name',function(err,data){
      // let newContact=new Contacts(data);
      cb(err,data);
    });
  }
  static insertData(data,cb){
    db.run(`INSERT INTO contacts (name,company,telp_number,email) VALUES ('${data.name}','${data.company}',
          '${data.telp_number}','${data.email}')`,function(err,result){
      cb(err,this);
    });
  }
  static deleteData(params,cb){
    db.run(`DELETE FROM contacts WHERE id=${params.id}`,function(err,result){
      cb(err,result)
    });
  }
  static findById(id,cb){
    db.each(`SELECT * FROM contacts WHERE id=${id}`,function(err,data){
      cb(err,data);
    });
  }
  static updateData(data,params,cb){
    db.run(`UPDATE contacts SET name='${data.name}',company='${data.company}',telp_number='${data.telp_number}',email='${data.email}' WHERE id=${params.id}`,function(err,result){
      cb(err,result)
    });
  }
}

module.exports = Contacts
