const express = require('express');
const bodyParser = require('body-parser');

// routing
const index = require('./routes/index.js');
const contacts = require('./routes/contacts.js');
const groups = require('./routes/groups.js');
const addresses = require('./routes/addresses.js');
const profiles = require('./routes/profiles.js');

const app = express();

// set ejs as the view engine
app.set('view engine', 'ejs');

// use body parser as a middleware for all requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routing
app.use('/', index);
app.use('/contacts', contacts);
app.use('/groups', groups);
app.use('/addresses', addresses);
app.use('/profiles', profiles);

// catch 404
app.use((req, res) => {
  	var err = new Error('404 - Page Not Found');
  	err.status = 404;
 	res.render('error', {err});
});


app.listen(3000, () => console.log('server is running on port 3000'));