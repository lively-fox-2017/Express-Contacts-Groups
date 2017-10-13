const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.set('view engine', 'ejs');

let index = require('./routs/index')
let contact = require('./routs/contact')
let profile = require('./routs/profile')
let address = require('./routs/address')
let group = require('./routs/group')
app.use('/', index)
app.use('/contacts', contact)
app.use('/profiles', profile)
app.use('/address', address)
app.use('/groups', group)

app.listen(3000,()=>{
  console.log('Magic Port 3000')
});	
