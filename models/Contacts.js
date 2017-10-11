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
  static getContacts(){
    return new Promise((resolve, reject)=>{ 
      db.all('SELECT * from Contacts',(err, dataContacts)=>{
        if(!err){
          let hasil = [];
          dataContacts.forEach((dataContact)=> {
            hasil.push( new Contacts({
              id : dataContact.id,
              nama: dataContact.nama,
              company : dataContact.company,
              telp_number: dataContact.telp_number,
              email : dataContact.email
            }))
          }, this);
          resolve(hasil);
        } else {
          reject(err);
        }  
      });
    })
    
  }

  static addContacts(addContacts){
    return new Promise((resolve, reject)=>{
      db.run(`INSERT into Contacts 
      (nama, company, telp_number, email) VALUES 
      ('${addContacts.nama}','${addContacts.company}',
      '${addContacts.phone}','${addContacts.email}')`,(err)=>{
        if(!err){resolve(null);} else {reject(err)}
      })
    })
  }

  static getIdContacts(id){
    return new Promise((resolve, reject)=>{
      db.get(`SELECT * from Contacts WHERE id = "${id}"`,(err, rows)=>{
        if(!err){
          resolve(rows);
        } else {
          reject(err);
        }
      });
    })
  }

  static processEditContacts(id, dataContacts){
      return new Promise((resolve, reject)=>{
        let str = `UPDATE Contacts set 
        nama ='${dataContacts.nama}',
        company = '${dataContacts.company}',
        telp_number = '${dataContacts.phone}',
        email = '${dataContacts.email}'
        WHERE id = ${id}`;
        db.all(str,(err, rows) => {
          if(err){reject(err)} else {resolve(rows);}
        });
      })
  
  }

  static deleteContacts(id){
    return new Promise((resolve, reject)=>{
      db.all(`DELETE from Contacts WHERE id = "${id}"`,(err, rows)=>{
        if(err){reject(err);} else {resolve(rows);}
      });
    })
    
  }
}

module.exports = Contacts;