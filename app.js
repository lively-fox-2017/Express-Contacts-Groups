const express=require('express')
const app=express()
var bodyParser = require('body-parser')
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var sqlite3= require ('sqlite3');
var db=new sqlite3.Database('./db/database.db')
// app.get('/', function (req, res) {
//   res.send('Hello World!')
// })
const index=require('./routes/index')
const contact=require('./routes/contact')
const group=require('./routes/group')
const profile=require('./routes/profile')
const address=require('./routes/address')

app.use('/',index)
app.use('/contact',contact)
app.use('/group',group)
app.use('/profile',profile)
app.use('/address',address)


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
