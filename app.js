// express
const express = require('express');
const app = express();

// // sqlite3
// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('./data.db');

// body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// ejs
app.set('view engine', 'ejs');

// route index --------------------------------------------------
const index = require('./routers/index');
app.use('/', index);

// route contacts --------------------------------------------------
const contacts = require('./routers/contacts');
app.use('/', contacts);

// route groups --------------------------------------------------
const groups = require('./routers/groups');
app.use('/', groups);

// route addresses --------------------------------------------------
const addresses = require('./routers/addresses');
app.use('/', addresses);

// route profile --------------------------------------------------
const profile = require('./routers/profiles');
app.use('/', profile);


app.listen(3000);
console.log('Listening on port 3000');