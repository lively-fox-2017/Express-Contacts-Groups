const express = require('express')
const app = express()
var path = require('path');
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('data.db');
app.set('view engine', 'ejs');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))
const contacts = require('./routes/contacts')
const groups = require('./routes/groups')
const profiles = require('./routes/profiles')
const addresses = require('./routes/addresses')
 
//buat index

app.use('/', contacts)

app.use('/', groups)

app.use('/', profiles)

app.use('/', addresses)

app.listen(5000, () => {
	console.log('Mulai gan')
})
