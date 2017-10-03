const express=require('express')
const app=express()
var bodyParser = require('body-parser')
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var sqlite3= require ('sqlite3');
var db=new sqlite3.Database('./db/database.db')

const index=require('./routes/index')
const group=require('./routes/group')
const contact=require('./routes/contact')
const address=require('./routes/address')
const profile=require('./routes/profile')
// console.log(db);

app.use('/',index)
app.use('/group',group)
app.use('/contact',contact)
app.use('/address',address)
app.use('/profile',profile)

// app.post('/contact',()=>{
//   req.redirect()
// })
app.listen(3001,()=>{
  console.log('Jalan di Port 3001');
})
