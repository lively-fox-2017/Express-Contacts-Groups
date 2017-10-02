var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/database.db');

class Address {
  constructor(){

  }

  static viewAddresses(cb){
    let query = `SELECT contacts.*,addresses.* FROM addresses LEFT JOIN contacts ON addresses.idContacts=contacts.id ORDER BY addresses.id`
    db.all(query,function(err,rows){
      cb(err,rows)
    })
  }

  static addAddresses(data,cb){
    db.run(`INSERT INTO addresses (street,city,zipcode,idContacts) VALUES ('${data.street}','${data.city}','${data.zipcode}','${data.idContacts}')`, function(){
      cb()
    })
  }

  static deleteAddresses(data,cb){
    db.run(`DELETE FROM addresses WHERE id = ${data.id}`, function(){
      cb()
    })
  }

  static geteditAddresses(data,cb){
    db.all(`SELECT * FROM addresses WHERE id=${data.id}`,function(err,rows){
      cb(err,rows)
    })
  }

  static posteditAddresses(data,params,cb){
    let query = `UPDATE addresses SET street='${req.body.street}',city='${req.body.city}',zipcode='${req.body.zipcode}' WHERE id='${req.params.id}'`
    db.run(query,function(err){
      cb(err)
    })
  }

}

module.exports = Address
