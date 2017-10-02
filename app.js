// load the things we need
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('data/data.db')

// set the view engine to ejs
app.set('view engine', 'ejs');

// body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// load css
app.use(express.static(__dirname+'/views'))


// index page
app.get('/', (req, res) => {
	//res.send ('hello world')
	res.render('index')
})

//*** contact page // read
app.get('/contacts',(req,res) =>{

	db.all('select * from Contacts', function(err, row){
		if(err){
			console.log('db load error')
		}else{
			res.render('contacts',{dataJsonContact:row})
		}
	})

})

// contact page // create
app.post('/contacts',(req,res) =>{

	db.run(`insert into Contacts(name, company, telp_number, email) VALUES ('${req.body.nama}','${req.body.company}','${req.body.notlp}','${req.body.email}')`)
	res.redirect('contacts')
	console.log(req.body)
})

//contact page // update => ambil edit
app.get('/contacts/edit/:id',(req,res) =>{
	db.all(`select * from Contacts where id="${req.param('id')}"`, function(err, row){
		//console.log(row)
		res.render('contact-edit',{dataJsonContact:row})
	})
})

//contact page // update => hasil edit
app.post('/contacts/edit/:id',(req,res) => {
	// update table-name SET column-name = '${value}', column-name = '${value}' where condition
	db.all(`update Contacts set name ='${req.body.nama}',company ='${req.body.company}',telp_number ='${req.body.notlp}',email ='${req.body.email}' where id='${req.param('id')}'`, function(err,row){
		res.redirect('../../contacts')
	})
})

//contact page // delete
app.get('/contacts/delete/:id',(req,res) => {
	db.all(`delete from Contacts where id="${req.param('id')}"`,(err,row) =>{
		console.log('deleted from Contacts')
		res.redirect('../../contacts')
	})
})



//*** groups page // read
app.get('/groups',(req,res) =>{
	db.all('select * from Groups', function(err, row){
		if(err){
			console.log('db load error')
		}else{
			res.render('groups',{dataJsonGroups:row})
		}
	})
})

// groups page // create
app.post('/groups',(req,res) =>{

	db.run(`insert into Groups(name_of_group) VALUES ('${req.body.nameOfGroups}')`)
	res.redirect('groups')
	console.log(req.body)
})

// groups page // update => ambil edit
app.get('/groups/edit/:id',(req,res) =>{
	db.all(`select * from Groups where id="${req.param('id')}"`, function(err, row){
		//console.log(row)
		res.render('groups-edit',{dataJsonGroups:row})
	})
})

// groups page // update => hasil edit
app.post('/groups/edit/:id',(req,res) => {
	// update table-name SET column-name = '${value}', column-name = '${value}' where condition
	db.all(`update Groups set name_of_group ='${req.body.nameOfGroups}' where id='${req.param('id')}'`, function(err,row){
		res.redirect('../../groups')
	})
})

// groups page // delete
app.get('/groups/delete/:id', (req,res) =>{
	db.all(`delete from Groups where id="${req.param('id')}"`,(err,row)=>{
		console.log('deleted from Groups')
		res.redirect('../../groups')
	})
})


//*** addresses page // read
app.get('/addresses',(req,res) =>{
	db.all('select * from Addresses',(err,row) => {
		if(err){
			console.log(`db load error from Addresses`)
		}else{
			res.render('Addresses',{dataJsonAddresses:row})
		}
	})
})

// addresses page // create
app.post('/addresses',(req,res) => {
	db.run(`insert into Addresses(street, city, zipcode) VALUES ('${req.body.street}','${req.body.city}','${req.body.zipcode}')`)
	res.redirect('addresses')
})

// addresses page // update => ambil edit
app.get('/addresses/edit/:id',(req,res)=>{
	db.all(`select * from Addresses where id="${req.param('id')}"`, function(err, row){
		//console.log(row)
		res.render('addresses-edit',{dataJsonAddresses:row})
	})
})

// addresses page // update => hasil edit
app.post('/addresses/edit/:id',(req,res) => {
	// update table-name SET column-name = '${value}', column-name = '${value}' where condition
	db.all(`update Addresses set street = '${req.body.street}',city = '${req.body.city}',zipcode = '${req.body.zipcode}' where id='${req.param('id')}'`, function(err,row){
		res.redirect('../../addresses')
	})
})

// addresses page // delete
app.get('/addresses/delete/:id',(req,res) => {
	db.all(`delete from Addresses where id="${req.param('id')}"`,(err,row) =>{
		console.log('deleted from Addresses')
		res.redirect('../../addresses')
	})
})

//*** profiles page // read
app.get('/profiles',(req,res) =>{
	let queryContacts = 'select * from Contacts'
	//	ALTER TABLE Profile ADD id_Contacts INTEGER REFERENCES Contacts('id')
	let joinQuery = 'select Profile.id, Profile.username, Profile.password, Contacts.name from Profile LEFT JOIN Contacts ON Profile.id_Contacts = Contacts.id'

	db.all(joinQuery,(err,row) => {
		if(err){
			console.log(`db join load err`)
		}else{
			db.all(queryContacts,(err,rows)=>{
				if(err){
					console.log(`db load err from Profile`)
				}else{
					// console.log('rows ===' + rows)
					res.render('profiles',{pesanError:'',dataJsonProfile:row,dataJsonContact:rows})
				}
			})
		}
	})
})

// profiles page // create
app.post('/profiles',(req,res) => {
	db.run(`insert into Profile(username, password, id_Contacts) VALUES ('${req.body.user_name}','${req.body.pass_word}','${req.body.name}')`,(err)=>{
		if(err){
			let queryContacts = 'select * from Contacts'
			//	ALTER TABLE Profile ADD id_Contacts INTEGER REFERENCES Contacts('id')
			let joinQuery = 'select Profile.id, Profile.username, Profile.password, Contacts.name from Profile LEFT JOIN Contacts ON Profile.id_Contacts = Contacts.id'

			db.all(joinQuery,(err,row) => {
				if(err){
					console.log(`db join load err`)
				}else{
					db.all(queryContacts,(err,rows)=>{
						if(err){
							console.log(`db load err from Profile`)
						}else{
							// console.log('rows ===' + rows)
							res.render('profiles',{pesanError: `Alert: nama sudah terpakai`, dataJsonProfile:row,dataJsonContact:rows})
						}
					})
				}
			})
		}else{
			res.redirect('profiles')
		}
	})
})

// profiles page // update => ambil edit
app.get('/profiles/edit/:id',(req,res)=>{
	let queryContacts = 'select * from Contacts'
  db.all(`select * from Profile where id="${req.param('id')}"`, function(err, row){
    //console.log(row)
		if(err){
			console.log('error update Profile')
		}else{
			db.all(queryContacts,(err,rows)=>{
				if(err){
					console.log('err load Contacts')
				}else{
					res.render('profiles-edit',{dataJsonProfile:row,dataJsonContact:rows})
				}
			})
		}

  })
})

// profiles page // update => hasil edit
app.post('/profiles/edit/:id',(req,res) => {
	// update table-name SET column-name = '${value}', column-name = '${value}' where condition
	db.all(`update Profile set username = '${req.body.username}',password = '${req.body.password}' where id='${req.param('id')}'`, function(err,row){
		res.redirect('../../profiles')
	})
})

// profiles page // delete
app.get('/profiles/delete/:id',(req,res) => {
	db.all(`delete from Profile where id="${req.param('id')}"`,(err,row) =>{
		console.log('deleted from Profile')
		res.redirect('../../profiles')
	})
})

// express SERV
app.listen(3000, () => {
	console.log('your serv listening on port 3000!')
})
