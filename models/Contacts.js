var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

class Contacts{
  constructor(input){
    this.id = input.id;
    this.nama = input.nama;
    this.company = input.company;
    this.zipcode = input.zipcode;
    this.telp_number = input.telp_number;
    this.email = input.email;
  }
  static getContacts(cb){
    db.all('SELECT * from Contacts',(err, dataContacts)=>{
      if(!err){
        let hasil = [];
        dataContacts.forEach((dataContact)=> {
          // console.log(dataContact)
          hasil.push( new Contacts({
            id : dataContact.id,
            nama: dataContact.nama,
            company : dataContact.company,
            telp_number: dataContact.telp_number,
            email : dataContact.email
          }))
        }, this);
        // console.log(hasil)
        cb(err, hasil);
      } else {
        console.log(err); 
      }
      
    });
  }

  static addContacts(addContacts, cb){
    db.run(`INSERT into Contacts 
    (nama, company, telp_number, email) VALUES 
    ('${addContacts.nama}','${addContacts.company}',
    '${addContacts.phone}','${addContacts.email}')`,(err)=>{
      if(!err){
        cb(null);
      } else {
        cb(err)
      }
    })
    
  }

  static getIdContacts(id, cb){
    db.get(`SELECT * from Contacts WHERE id = "${id}"`,(err, rows)=>{
      cb(err, rows)     
    });
  }

  static processEditContacts(id, dataContacts, cb){
      
  let str = `UPDATE Contacts set 
            nama ='${dataContacts.nama}',
            company = '${dataContacts.company}',
            telp_number = '${dataContacts.phone}',
            email = '${dataContacts.email}'
            WHERE id = ${id}`;
      db.all(str,(err, rows) => {
        if(err){
          console.log(err);
        } else {
          cb(err, rows);
        }
      });
  }

  static deleteContacts(id, cb){
    db.all(`DELETE from Contacts WHERE id = "${id}"`,(err, rows)=>{
      if(err){console.log(err);} else {cb(err, rows);}
    });
  }
}

module.exports = Contacts;