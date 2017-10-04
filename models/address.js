"use strict"

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/data.db')

class Address{

//start of getAll
static getAll(callback){
  let query1 = `SELECT addresses.id, addresses.street, addresses.city, addresses.zipcode,
                addresses.contactsId, contacts.name FROM addresses LEFT JOIN contacts
                on addresses.contactsId = contacts.id`;

  db.all(query1, (err, rows1)=>{
    let query2 = `SELECT * FROM contacts`;
    db.all(query2, (err, rows2)=>{
      if(err){
        console.log(err);
      };
      callback(rows1, rows2)
    });
  });


  // let query = `SELECT * FROM addresses`;
  //
  // db.all(query, (err,rows)=>{
  //   if(err){
  //     console.log(err);
  //   };
  //   callback(rows)
  // })
}
//end of getAll

//start of create
static create(req, callback){
  let query = `INSERT INTO addresses (street, city, zipcode, contactsId)
               VALUES ('${req.body.street}', '${req.body.city}', '${req.body.zipcode}',
               '${req.body.contactsId}')`;
  db.run(query, (err, rows)=>{
    if(err){
      console.log(err);
    };
    callback(rows)
  })
}
//end of create

//start of getEdit
static getEdit(req, callback){
  let query1 = `SELECT addresses.id, addresses.street, addresses.city, addresses.zipcode,
                addresses.contactsId, contacts.name FROM addresses LEFT JOIN contacts
                on addresses.contactsId = contacts.id WHERE addresses.id = ${req.params.id}`;

  db.all(query1, (err, rows1)=>{
    let query2 = `SELECT * FROM contacts`;
    db.all(query2, (err, rows2)=>{
      if(err){
        console.log(err);
        return ;
      };
      callback(rows1, rows2)
    })
  })
  // let query = `SELECT * FROM addresses WHERE id = ${req.params.id}`;
  // db.all(query, (err,rows)=>{
  //   if(err){
  //     console.log(err);
  //   };
  //   callback(rows);
  // });
};
//end of getEdit

//start of postEdit
static postEdit(req, callback){
  let query = `UPDATE addresses
               SET street = '${req.body.street}', city = '${req.body.city}',
               zipcode = '${req.body.zipcode}', contactsId = '${req.body.contactsId}'
               WHERE id = '${req.params.id}'`;
  db.run(query, (err)=>{
    if(err){
      console.log(err);
    };
    callback();
  });
};
//end of postEdit

//start of getDelete
static getDelete(req, callback){
  let query = `DELETE FROM addresses WHERE id = ${req.params.id}`;
  db.run(query, ()=>{
    callback()
  });
};
//end of getDelete

};

module.exports = Address;
