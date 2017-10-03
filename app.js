const express = require('express');
const app = express();
// set the view engine to ejs
app.set('view engine', 'ejs');
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json 
app.use(bodyParser.json())

//REQUIRE
let index = require('./router/index');
let addresses = require('./router/Addresses');
let contacts =  require('./router/Contacts');
let groups = require('./router/Groups');
let profiles = require('./router/Profiles');
let addresses_with_contact =  require('./router/AddresseswithContacts');
// MENU ----- 
app.use('/',index);
app.use('/addresses', addresses);
app.use('/contacts', contacts);
app.use('/profiles', profiles);
app.use('/groups', groups);
app.use('/addresses_with_contact', addresses_with_contact);


app.listen(3000, () => {
  console.log('Membuka port 3000!');
});