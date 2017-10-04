"use strict"

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/data.db');

class Group {

//start of static getAll
static getAll(callback){
  let query = 'SELECT * FROM groups';
  db.all(query, (err, rows)=>{
    if(err) {
      console.log(err);
    };
    callback(rows);
  });
};
//End of static getAll

//start of static create
static create(req, callback){
  let query = `INSERT INTO groups (name_of_group) VALUES('${req.body.name_of_group}')`;
  db.run(query, (err, rows)=>{
    if(err){
      console.log(err);
    };
    callback(rows);
  });
};
//End of static create

//start of getEdit
static getEdit(req, callback){
  let query = `SELECT * FROM groups WHERE id = ${req.params.id}`;
  db.all(query, (err, rows)=>{
    if(err){
      console.log(err);
    };
    callback(rows);
  });
};
//End of getEdit

//start of postEdit
static postEdit(req, callback){
  let query = `UPDATE groups SET name_of_group = '${req.body.name_of_group}' WHERE id = '${req.params.id}'`;
  db.run(query, (err)=>{
    if(err){
      console.log(err);
    };
    callback();
  });
};
//End of postEdit

//start of delete
static getDelete(req, callback){
  let query = `DELETE FROM groups WHERE id = ${req.params.id}`;
  db.run(query, ()=>{
    callback();
  });
};
//end of delete

};

module.exports = Group
