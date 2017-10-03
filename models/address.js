const sqlite3 = require('sqlite3').verbose();
const db= new sqlite3.Database ('db/database.db')

class Address {
  constructor() {

  }

  static postInsert(body){
    db.run(`INSERT INTO Addresses(street,city,zipcode,idContacts)
    VALUES
    ('${body.street}',
    '${body.city}',
    '${body.zipcode}',
    '${body.idContacts}')`)
  }

  static getDelete(params){
    db.run(`DELETE FROM Addresses WHERE id =${params.id}`)
  }

  static getEditAddress(params,cb){
    db.all(`SELECT * FROM Addresses WHERE id=${params.id}`,(err,dataAddress)=>{
      cb(dataAddress)
    })
  }
  static postEdit(body,params,cb){
    db.run(`UPDATE Addresses SET street='${body.street}',
      city='${body.city}',
      zipcode='${body.zipcode}'
       WHERE id=${params.id}`,(err)=>{
         if(!err){
           cb()
         }else{
           cb(err);
         }
       })
  }
}

module.exports = Address;
