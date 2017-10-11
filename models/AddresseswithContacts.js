var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

class AddressContacts{
  constructor(){

  }
  static getAddressContacts(cb){
    db.all(`SELECT Addresses.id, Addresses.street, 
    Addresses.city, Addresses.zipcode, 
    Contacts.nama, Contacts.company, 
    Contacts.telp_number, Contacts.email 
    from Addresses LEFT JOIN Contacts 
    ON Addresses.ContactsId = Contacts.id` ,(err, rows)=>{
      if(!err){
          db.all('SELECT * from Contacts',(err, rowsContact)=>{
            cb(rows, rowsContact)
          })
        }else {
          console.log(err);
        }
      });
  }

  static addAddressesContacts(dataAddressContacts, cb){
    let query = `INSERT into Addresses 
    (street, city, zipcode, ContactsId) 
    VALUES ('${dataAddressContacts.street}',
    '${dataAddressContacts.city}',
    '${dataAddressContacts.zipcode}',
    '${dataAddressContacts.name}')`
    db.run(query,(err, rows)=>{
      if(!err){cb(null)}else{cb(err)}
    });  
  }

  static getIdAddressContacts(id, cb){
    db.all(`SELECT * from Addresses WHERE id = "${id}"`,(err, rows)=>{
      if(!err){
        db.all('SELECT * from Contacts',(err, rowsContact)=>{
         if(!err){
           cb(err, rows, rowsContact)
         } else {
           console.log(err);
         }
        });
      }
    });
  }

  static processEditDataAddressContacts(id, dataAddressContacts, cb){
    let str = "UPDATE Addresses set ContactsId = '"+dataAddressContacts.name+"', street ='" +dataAddressContacts.street+ "',";
    str += "city = '" +dataAddressContacts.city+"',";
    str += "zipcode = '"+dataAddressContacts.zipcode+"'";
    str += "WHERE id = "+id;
    db.all(str,(err, rows)=>{
      if(err){
        console.log(err);
      }else{
      cb(err, rows)
      console.log(rows);
      }
    });
  }

  static deleteAddressesContacts(id, cb){
    db.all(`DELETE from Addresses WHERE id = "${id}"`,(err, rows)=>{
      if(!err){cb(err, rows)}else{console.log(err)}
    });
  }
}

module.exports = AddressContacts;