//EXPRESS
var express = require('express')
var app = express()

//DB
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

//EJS
var ejs = require('ejs')
app.set('view engine', 'ejs')

//BODY-PARSER
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//YOUR CODE HERE
app.get('/', function(req, res){
	res.render('index')
})

//===============MAIN
app.get('/contacts', function(req, res){
	db.all('select * from Contacts', function(err, rows){
		// console.log(rows)
		res.render('contacts', {data:rows})
	})
})

app.get('/addressContact/:id', (req, res)=>{
	let qAddress = `select * from Address where contact_id = '${req.params.id}'`
	db.all(qAddress, (err, rows)=>{
		// res.send(rows)
		db.get(`select * from Contacts where id = '${req.params.id}'`, (err, rowsContact)=>{
			// res.send(rows[0].street)
			res.render('addressContact', {data:rows, dataContacts:rowsContact})
		})
		
	})

})

app.post('/addressContact/edit/:id', (req, res) => {
	let insert = `INSERT INTO Address (street, city, zipcode, contact_id) VALUES ('${req.body.street}', '${req.body.city}','${req.body.zipcode}', '${req.params.id}')`

	db.run(insert, (err) => {
		// res.send(insert)
		// console.log(insert)
		res.redirect(`../${req.params.id}`)
		// console.log('data diupdate')	
	})

})

//-----------------------CONTACTS-------------------------------------------
//---------------QUERY
app.post('/contacts', (req, res) =>{
	db.run(`INSERT INTO Contacts (name, company, telp_number, email)
	 values ('${req.body.nama}', '${req.body.company}', '${req.body.telp_number}', '${req.body.email}')`)
	res.redirect('contacts')
	console.log(req.body)
})

//---------------GET ID
app.get('/contacts/edit/:id', (req, res) => {
  db.all(`select * from Contacts where id = ${req.params.id}`,(err, rows)=>{
    res.render('editContact', {data:rows})
  });
});

//------------UPDATE
app.post('/contacts/edit/:id', (req, res) => {
	let update = `UPDATE Contacts SET name = '${req.body.name}', company = '${req.body.company}',
	 telp_number = '${req.body.telp_number}', email = '${req.body.email}' WHERE id = ${req.params.id}`

	db.run(update, (err) => {
		console.log(update)
		res.redirect('../../contacts')
		console.log('data diupdate')	
	})

})

//----------------DELETE
app.get('/contacts/delete/:id', (req, res ) => {
	db.run(`DELETE FROM Contacts WHERE id = ${req.params.id}`, (err) => {
		console.log(req.params)
		console.log('data berhasil delete')
		res.redirect('../../contacts')
	})
	
})
//----------------------- END CONTACTS-------------------------------------------

//-----------------------GROUPS-------------------------------------------
app.get('/groups', function(req, res){
	db.all('select * from Groups', function(err, rows){
		// console.log(rows)
		res.render('groups', {data:rows})
	})
})
//---------------QUERY
app.post('/groups', (req, res) =>{
	db.run(`INSERT INTO Groups (name_of_group)
	 values ('${req.body.name_of_group}')`)
	res.redirect('groups')
	console.log(req.body)
})

//---------------GET ID
app.get('/groups/edit/:id', (req, res) => {
  db.all(`select * from Groups where id = ${req.params.id}`,(err, rows)=>{
    res.render('editGroups', {data:rows})
  });
});

//------------UPDATE
app.post('/groups/edit/:id', (req, res) => {
	let update = `UPDATE Groups SET name_of_group = '${req.body.name_of_group}' WHERE id = ${req.params.id}`

	db.run(update, (err) => {
		console.log(update)
		res.redirect('../../groups')
		console.log('data diupdate')	
	})

})

//----------------DELETE
app.get('/groups/delete/:id', (req, res ) => {
	db.run(`DELETE FROM Groups WHERE id = ${req.params.id}`, (err) => {
		console.log(req.params)
		console.log('data berhasil delete')
		res.redirect('../../groups')
	})
	
})

//-----------------------END-GROUPS-------------------------------------------


//-----------------------ADRESSES-------------------------------------------


app.get('/addresses', function(req, res){
	let qAddress = 'SELECT Address.id,Address.street, Address.City, Address.zipcode, Contacts.name FROM Address LEFT JOIN Contacts ON Address.contact_id = Contacts.id;'
	let qContacts = 'SELECT * FROM Contacts'

	db.all(qAddress, function(err, rows){
		db.all(qContacts, (err, rowsContact) => {

			res.render('addresses', {data:rows, dataContacts:rowsContact})
		})
		
	})
})
//---------------QUERY
app.post('/addresses', (req, res) =>{
	db.run(`INSERT INTO Address (street, city, zipcode, contact_id)
	 values ('${req.body.street}', '${req.body.city}', '${req.body.zipcode}', '${req.body.contact_id}')`, (err)=>{
	 	// res.send(req.body)
	 	res.redirect('addresses')
	 })
	
	// res.redirect('addresses')
	// console.log(req.body)
})

//---------------GET ID
app.get('/addresses/edit/:id', (req, res) => {
	let qContacts = 'Select * from Contacts;'
  db.all(`select * from Address where id = ${req.params.id}`,(err, rows)=>{
  	db.all(qContacts, (err, rowsContact)=>{
  		res.render('editAddresses', {data:rows, dataContacts:rowsContact})
  	})
    
  });
});

//------------UPDATE
app.post('/addresses/edit/:id', (req, res) => {
	let update = `UPDATE Address SET street = '${req.body.street}', zipcode = '${req.body.zipcode}', contact_id= '${req.body.contact_id}' WHERE id = ${req.params.id}`
	db.run(update, (err) => {
		// res.send(req.body)
		res.redirect('../../addresses')
		console.log('data diupdate')	
	})

})

//----------------DELETE
app.get('/addresses/delete/:id', (req, res ) => {
	db.run(`DELETE FROM Address WHERE id = ${req.params.id}`, (err) => {
		// res.send(`DELETE FROM Addres WHERE id = ${req.params.id}`)
		console.log('data berhasil delete')
		res.redirect('../../addresses')
	})
	
})
//-----------------------END-ADRESSES-------------------------------------------

//-----------------------PROFILE-------------------------------------------
app.get('/profile', function(req, res){
	let qProfile = 'SELECT Profile.id, Profile.username, Profile.password, Contacts.name FROM Profile LEFT JOIN Contacts ON Profile.contact_id = Contacts.id';
	let qContact = 'SELECT  * FROM Contacts'

	db.all(qProfile, function(err, rows){
		if(!err) {
			// res.send(rows)
		  db.all(qContact, (err, rowsContact) =>{
		  	res	.render('profile', {data:rows, dataContacts: rowsContact})
		  })
		}
	})
})
//---------------INSERT
app.post('/profile', (req, res) =>{

	db.run(`INSERT INTO Profile (username, password, contact_id)
	 values ('${req.body.username}', '${req.body.password}', '${req.body.contact_id}')`, (err) =>{
	 	if(!err){
	 		// res.send(req.body)
		res.redirect('profile')
		}
		else{
			if(err.code == 'SQLITE_CONSTRAINT'){
				// res.send(err.code)
				res.redirect('profile')
			}
		}
		
	 })
	
})

//---------------GET ID
app.get('/profile/edit/:id', (req, res) => {
  db.all(`select * from Profile where id = ${req.params.id}`,(err, rows)=>{
  	// res.send(`select * from Profile where id = ${req.params.id}`)
    res.render('editProfile', {data:rows})
  });
});

//------------UPDATE
app.post('/profile/edit/:id', (req, res) => {
	let update = `UPDATE Profile SET username = '${req.body.username}', password = '${req.body.password}', contact_id=${req.body.contact_id} WHERE id = ${req.params.id}`
	
	db.run(update, (err) => {
		console.log(update)
		res.redirect('../../profile')
		console.log('data diupdate')	
	})

})

//----------------DELETE
app.get('/profile/delete/:id', (req, res ) => {
	db.run(`DELETE FROM Profile WHERE id = ${req.params.id};`, (err) => {
		console.log(`DELETE FROM Profile WHERE id = ${req.params.id};`)
		console.log('data berhasil delete')
		res.redirect('../../profile')
	})
	
})
//-----------------------END-PROFILE-------------------------------------------

//gunakan req.body.nama_parameter
//untuk mengakses nilai di dalam ejs
app.listen(3000)