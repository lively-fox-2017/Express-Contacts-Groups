"use strict"

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/data.db');

class Profile {

//start of getAll
static getAll(callback){
  let query1 = `SELECT users.id, users.username, users.password,
               users.contactsId, contacts.name FROM users
               LEFT JOIN contacts
               on users.contactsId = contacts.id`;

  db.all(query1, (err, rows1)=>{
    let query2 = `SELECT * FROM contacts`
    db.all(query2, (err, rows2)=>{
      if(err){
        console.log(err);
        return;
      }
      callback(rows1, rows2);
    })
  })
}
//end of getAll

//start of create
static create(req, callback){
  let query = `INSERT INTO users (username, password, contactsId)
             VALUES ('${req.body.username}', '${req.body.password}',
             '${req.body.contactsId}')`;
  db.run(query, (err, rows)=>{
    if(err){
      console.log(err);
    };
    callback(rows);
  })
}

//end of create

//star of getEdit
static getEdit(req, callback){
  let query1 = `SELECT users.id, users.username, users.password,
               users.contactsId, contacts.name FROM users
               LEFT JOIN contacts
               on users.contactsId = contacts.id WHERE users.id = ${req.params.id}`;

  db.all(query1, (err, rows1)=>{
    let query2 = `SELECT * FROM contacts`
    db.all(query2, (err, rows2)=>{
      if(err){
        console.log(err);
        return;
      }
      callback(rows1, rows2);
    })
  })


  // let query = `SELECT * FROM users WHERE id = ${req.params.id}`
  // db.all(query, (err, rows) => {
  //   if (err) {
  //     console.log(err);
  //     return;
  //   }
  //   callback(rows);
  // });
}


//end of getEdit

//star of postEdit
static postEdit(req, callback){
  let query = `UPDATE users SET
                username = '${req.body.username}',
                password = '${req.body.password}',
                contactsId = '${req.body.contactsId}'
                WHERE id = '${req.params.id}'`;
  db.run(query, (err)=>{
    if (err){
      console.log(err);
    };
    callback()
  })
}

//end of postEdit

//star of getDelete
static getDelete(req, callback){
  let query = `DELETE FROM users WHERE id = ${req.params.id}`;
  db.run(query, (err)=>{
    if(!err){
      callback();
    }
  })
}

//end of getDelete

}

module.exports = Profile
