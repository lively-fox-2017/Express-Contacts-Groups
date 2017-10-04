"use strict"

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/data.db');

class Contact {

//start of static getAll
  static getAll(callback){
    let query = 'SELECT * FROM contacts';

    db.all(query, (err, rows)=>{
      if(err) {
        console.log(err);
      };
      callback(rows)
    });
  };
//end of static getAll

//start of static create
static create(req, callback){
  let query = `INSERT INTO contacts (name, company, email, telp)
               VALUES('${req.body.name}', '${req.body.company}',
               '${req.body.email}', '${req.body.telp}')`;
  db.run(query, (err, rows)=>{
    if(err){
      console.log(err);
    };
    callback(rows)
  });
};
//end of start create

//start of getEdit
static getEdit(req, callback){
  let query = `SELECT * FROM contacts WHERE id = ${req.params.id}`;
  db.all(query, (err, rows)=>{
    if(err) {
      console.log(err);
    };
    callback(rows);
  });
}
//end of getEdit

//start of postEdit
static postEdit(req, callback){
  let query = `UPDATE contacts
               SET name = '${req.body.name}', company = '${req.body.company}',
               email = '${req.body.email}', telp='${req.body.telp}'
               WHERE id = '${req.params.id}'`;
  db.run(query, (err)=>{
    if(!err){
      callback()
    };
  });
}
//end of postEdit

//start of getDelete
static getDelete(req, callback){
  let query = `DELETE FROM contacts WHERE id = ${req.params.id}`;
  db.run(query, ()=>{
    callback();
  });
};
//end of getDelete

};

module.exports = Contact
