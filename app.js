const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/database.db');

let RouteIndex = require('./routes/index.js')
let RouteContact = require('./routes/contacts.js');
let RouterGroups = require('./routes/groups.js');
let RouterAddresses = require('./routes/addresses.js');
let RouterProfiles = require('./routes/profiles.js');

app.use('/',RouteIndex);
app.use('/contacts',RouteContact);
app.use('/groups',RouterGroups);
app.use('/addresses',RouterAddresses);
app.use('/profiles',RouterProfiles);

app.listen(3000, function() {
  console.log('Sudah terhubung ke Port 3000')
})
