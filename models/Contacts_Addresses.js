var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

class Conjuction{
  getConjuction(){
    db.all('SELECT * FROM Contacts_Addresses', (err, dataConjuntion)=>{
      
    })
  }
}

module.exports = Conjuction;