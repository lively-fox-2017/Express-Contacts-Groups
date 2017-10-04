const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/data.db')

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const index = require('./routes/index')
const contacts = require('./routes/contacts')
const profiles = require('./routes/profiles')
const address = require('./routes/addresses')
// const groups = require('./routes/groups')

app.use('/', index)
app.use('/contacts', contacts)
app.use('/profiles', profiles)
app.use('/addresses', address)
// app.use('/groups', groups)

app.listen(3000, function(){
  console.log(`AYO JALAN!`)
})
