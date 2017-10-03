var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

class Addresses{
  static getAddresses(cb){
    db.all(`SELECT Addresses.id,
    Addresses.street,
    Addresses.city,
    Addresses.zipcode,
    Contacts.nama
    from Addresses
    LEFT JOIN Contacts ON 
    Addresses.ContactsId = Contacts.id`
    ,(err, rows)=>{
      // SELECT Profile.id, Profile.username, Profile.password, Contacts.nama from Profile LEFT JOIN Contacts ON Profile.ContactsId = Contacts.id'
      if(!err){
        db.all('SELECT * from Contacts',(err, rowsContact)=>{
          cb(rows, rowsContact)
          // res.send(rows)
          console.log(rows);   
        })
      }else {
        console.log(err);
      }
    });
  }

  static createAddresses(addAddress, cb){
    db.run(`INSERT into Addresses
     (street, city, zipcode, ContactsId)
      VALUES ('${addAddress.street}',
      '${addAddress.city}',
      '${addAddress.zipcode}',
      '${addAddress.name}')`,(err)=>{
      if(err){
        cb(err);
      } else {
        cb(null)
      }
    });
  }

  static getAddressesId(id ,cb){
    db.get(`SELECT * from Addresses WHERE id = "${id}"`,(err, rowsAddress)=>{
      // console.log(rows);
      if(!err){
        db.all('SELECT * from Contacts',(err, rowsContact)=>{
          if(!err){
          cb(rowsAddress, rowsContact);
          }
        })
      }
    });
  }

  static processEditAddresses(id, dataAddresses, cb){
    let str = `UPDATE Addresses set ContactsId = '${dataAddresses.name}', street ='${dataAddresses.street}', zipcode = '${dataAddresses.zipcode}' WHERE id = '${id}'`;
    db.all(str,(err, rows)=>{
      if(err){console.log(err);}else{cb(err, rows)}
    });
  }

  static deleteAddresess(id, cb){
    db.all(`DELETE from Addresses WHERE id = "${id}"`,(err, rows)=>{
      if(err){console.log(err);}else{cb(err, rows)};
    });
  }
}

module.exports = Addresses;