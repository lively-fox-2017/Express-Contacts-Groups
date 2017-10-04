const express = require('express')
const app = express()

var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./db/data.db')

var bodyParser = require('body-parser')

app.set('view engine', 'ejs')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//routing
// app.get('/', function(req, res){
//   res.render('index')
// })

let index = require('./routes/index');
let contact = require('./routes/contacts');
let grup = require('./routes/groups');
let address = require('./routes/addresses');


app.use('/', index);
app.use('/contacts', contact);
app.use('/groups', grup);
app.use('/addresses', address);


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
