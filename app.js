var express = require('express')
var app = express()
var bodyParser = require('body-parser')
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const index=require('./routes/index')
const contacts=require('./routes/contacts')
const groups=require('./routes/groups')
const addresses=require('./routes/addresses')
const profiles=require('./routes/profiles')
app.use('/',index);
app.use('/contacts',contacts);
app.use('/groups',groups);
app.use('/addresses',addresses);
app.use('/profiles',profiles);


app.listen(3000,()=>{
  console.log('app listen on port 3000');
})
