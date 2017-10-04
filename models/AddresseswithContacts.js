var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

class AddressContacts{
  constructor(){

  }
  static getAddressContacts(){
    return new Promise((resolve, reject)=>{
      db.all(`SELECT Addresses.id, Addresses.street, 
      Addresses.city, Addresses.zipcode, 
      Contacts.nama, Contacts.company, 
      Contacts.telp_number, Contacts.email 
      from Addresses LEFT JOIN Contacts 
      ON Addresses.ContactsId = Contacts.id` ,(err, rows)=>{
        if(!err){
            db.all('SELECT * from Contacts',(err, rowsContact)=>{
              let obj={
                rows:rows,
                rowsContact: rowsContact
              }
              resolve(obj)
            })
          }else {
            reject(err);
          }
        });
    })
  }

  static addAddressesContacts(dataAddressContacts){
    return new Promise((resolve, reject)=>{
      let query = `INSERT into Addresses 
      (street, city, zipcode, ContactsId) 
      VALUES ('${dataAddressContacts.street}',
      '${dataAddressContacts.city}',
      '${dataAddressContacts.zipcode}',
      '${dataAddressContacts.name}')`
      db.run(query,(err, rows)=>{
        if(!err){resolve(null)}else{reject(err)}
      }); 
    })
  }

  static getIdAddressContacts(id){
    return new Promise((resolve, reject)=>{
      db.all(`SELECT * from Addresses WHERE id = "${id}"`,(err, rows)=>{
        if(!err){
          db.all('SELECT * from Contacts',(err, rowsContact)=>{
           if(!err){
             let Obj={
              rows:rows,
              rowsContact:rowsContact
             }
             resolve(Obj)
           } else {
             reject(err);
           }
          });
        }
      });
    })
  }

  static processEditDataAddressContacts(id, dataAddressContacts){
    return new Promise((resolve, reject)=>{
      let str = "UPDATE Addresses set ContactsId = '"+dataAddressContacts.name+"', street ='" +dataAddressContacts.street+ "',";
      str += "city = '" +dataAddressContacts.city+"',";
      str += "zipcode = '"+dataAddressContacts.zipcode+"'";
      str += "WHERE id = "+id;
      db.all(str,(err, rows)=>{
        if(err){reject(err); } else {resolve(err, rows)}
      });
    })
  }

  static deleteAddressesContacts(id){
    return new Promise((resolve, reject)=>{
      db.all(`DELETE from Addresses WHERE id = "${id}"`,(err, rows)=>{
        if(!err){resolve(rows)} else {reject(err)} 
      });
    })   
  }
}

module.exports = AddressContacts;