var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');
var Contact = require('./Contacts')

class Addresses{
  static getAddresses(){
    // return new Promise((resolve, reject)=>{
    //   db.all(`SELECT Addresses.id,
    //   Addresses.street,
    //   Addresses.city,
    //   Addresses.zipcode,
    //   Contacts.nama
    //   from Addresses
    //   LEFT JOIN Contacts ON 
    //   Addresses.ContactsId = Contacts.id`
    //   ,(err, rows)=>{
    //      if(!err){
    //       resolve(objResult); 
    //     }else {
    //       reject(err);
    //     }
    //   });
    // })


    return new Promise((resolve, reject)=>{
      db.all(`SELECT * FROM Addresses` ,(err, rowAddress)=>{
        var count = 0
        rowAddress.forEach((row) => {
          //get contact by row.contact_id
          Contact.getIdContacts(row.ContactsId)
          .then((dataContact) => {
            row.contactName = dataContact.nama
            row.company = dataContact.company
            count++ 
            if(count == rowAddress.length) {
              resolve(rowAddress)
            }
          })
        })
      });
    })
  }

  static createAddresses(addAddress){
    return new Promise((resolve, reject)=>{
      db.run(`INSERT into Addresses
      (street, city, zipcode, ContactsId)
       VALUES ('${addAddress.street}',
       '${addAddress.city}',
       '${addAddress.zipcode}',
       '${addAddress.name}')`,(err)=>{
       if(err){
         reject(err);
       } else {
         resolve(null)
       }
     });
    })
    
  }

  static getAddressesId(id){
    return new Promise((resolve, reject)=>{
      db.get(`SELECT * from Addresses WHERE id = "${id}"`,(err, rowsAddress)=>{
        // console.log(rows);
        if(!err){
          db.all('SELECT * from Contacts',(err, rowsContact)=>{
            if(!err){
              let objAddress={
                rowsAddress:rowsAddress,
                rowsContact:rowsContact
              }
              resolve(objAddress);
            } else {
              reject(err);
            }
          })
        }
      });
    })
  }

  static processEditAddresses(id, dataAddresses){
    return new Promise((resolve, reject)=>{
      let str = `UPDATE Addresses set ContactsId = '${dataAddresses.name}', street ='${dataAddresses.street}', zipcode = '${dataAddresses.zipcode}' WHERE id = '${id}'`;
      db.all(str,(err, rows)=>{
        if(err){reject(err);}else{resolve(rows)}
      });
    })
  }

  static deleteAddresess(id){
    return new Promise((resolve, reject)=>{
      db.all(`DELETE from Addresses WHERE id = "${id}"`,(err, rows)=>{
        if(err){reject(err);}else{resolve(err, rows)};
      });
    })
    
  }
}

module.exports = Addresses;