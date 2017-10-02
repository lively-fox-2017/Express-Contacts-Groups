let express = require('express');
let app = express()
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('data.db');
let body = require('body-parser');

app.set('view engine','ejs')

app.use(body.urlencoded({ extended: false }));

app.use(body.json());

app.get('/',function(req,res){
	res.render('index.ejs')
})

//Contacts

app.get('/contacts',function(req,res){
	db.all(`SELECT * FROM contacts`,function(err,rows){
		if(err){
			console.log(err);
		}
		else{
			res.render('contacts.ejs',{dataJsonContacts:rows});
			console.log('contacts render success');
		}
	})
})

app.post('/contacts', function (req, res) {
  db.run(`INSERT INTO contacts (name,company,telp_number,email) VALUES('${req.body.name}','${req.body.company}','${req.body.telp_number}','${req.body.email}')`, function(err){
		if(err){
			console.log(err);
		}
	})
	res.redirect('/contacts')
})

app.get('/contacts/edit/:id',function(req,res){
	db.all(`SELECT * FROM contacts WHERE id = ${req.params.id}`,function(err,rows){
		if(err){
			console.log(err)
		}
		else{
			res.render('editContact.ejs',{dataJsonContacts:rows});
		}
	})
	let idContactEdit = req.params.id
	app.post('/contacts/edit/:id',function(req,res){
		db.run(`UPDATE contacts SET name = '${req.body.name}', company = '${req.body.company}', telp_number = '${req.body.telp_number}', email = '${req.body.email}' WHERE id = ${idContactEdit}`,function(err){
			if(err){
				console.log(err);
			}
		})
		res.redirect('/contacts')
	})
})

app.get('/contacts/delete/:id',function(req,res){
	let idContactDelete = req.params.id;
	db.run(`DELETE FROM contacts WHERE id = ${idContactDelete}`,function(err){
		if(err){
			console.log(err)
		}
	})
	res.redirect('/contacts')
})

//Groups

app.get('/groups',function(req,res){
	db.all('SELECT * FROM groups',function(err,rows){
		if(err){
			console.log(err);
		}
		else{
			res.render('groups.ejs',{dataJsonGroups:rows});
			console.log('groups render success')
		}
	})
})

app.post('/groups', function (req, res) {
  db.run(`INSERT INTO groups (name_of_group) VALUES('${req.body.name_of_group}')`, function(err){
		if(err){
			console.log(err);
		}
	})
	res.redirect('/groups')
})

app.get('/groups/edit/:id',function(req,res){
	db.all(`SELECT * FROM groups WHERE id = ${req.params.id}`,function(err,rows){
		if(err){
			console.log(err);
		}
		else{
			res.render('editGroup.ejs',{dataJsonGroups:rows});
		}
	})
	let idGroupEdit = req.params.id;
	app.post('/groups/edit/:id',function(req,res){
		db.run(`UPDATE groups SET name_of_group = '${req.body.name_of_group}' WHERE id = ${idGroupEdit}`,function(err){
			if(err){
				console.log(err);
			}
		})
		res.redirect('/groups')
	})
})

app.get('/groups/delete/:id',function(req,res){
	let idGroupDelete = req.params.id;
	db.run(`DELETE FROM groups WHERE id = ${idGroupDelete}`,function(err){
		if(err){
			console.log(err)
		}
	})
	res.redirect('/groups')
})

//profile

app.get('/profile',function(req,res){
	db.all(`SELECT profile.id, profile.username, profile.password, profile.contact_id, contacts.name FROM profile LEFT JOIN contacts ON profile.contact_id = contacts.id`,function(err,rows){
		if(err){
			console.log(err);
		}
		else{
			db.all(`SELECT * FROM contacts`,function(err,rows1,errors){
				if(err){
					console.log(err);
				}
				else{
					// console.log(rows1[0].id);
					res.render('profiles.ejs',{dataJsonProfiles:rows,dataJsonContactId:rows1,error:errors});
				}
			})
			console.log('profiles render success');
		}
	})
})

app.post('/profile', function (req, res) {
  db.run(`INSERT INTO profile (username,password,contact_id) VALUES('${req.body.username}', '${req.body.password}', '${req.body.contact_id}')`, function(err){
		if(err){
			console.log('ADA ERROR');
			db.all(`SELECT profile.id, profile.username, profile.password, profile.contact_id, contacts.name FROM profile LEFT JOIN contacts ON profile.contact_id = contacts.id`,function(err,rows){
				if(err){
					console.log(err);
				}
				else{
					db.all(`SELECT * FROM contacts`,function(err,rows1){
						if(err){
							console.log(err);
						}
						else{
							// console.log(rows1[0].id);
							console.log('aw');
							res.render('profiles.ejs',{dataJsonProfiles:rows,dataJsonContactId:rows1,error:"NAH LOH"});
						}
					})
					console.log('profiles render success');
				}
			})
		}
		else{
			console.log('yes');
			res.redirect('/profile')
		}
	})
})

app.get('/profile/edit/:id',function(req,res){
	db.all(`SELECT * FROM profile WHERE id = ${req.params.id}`,function(err,rows){
		if(err){
			console.log(err);
		}
		else {
			res.render('editProfile.ejs',{dataJsonProfiles:rows});
		}
	})
	let idProfileEdit = req.params.id;
	app.post('/profile/edit/:id',function(req,res){
		db.run(`UPDATE profile SET username = '${req.body.username}', password = '${req.body.password}' WHERE id = ${idProfileEdit}`,function(err){
			if(err){
				console.log(err);
			}
		})
		res.redirect('/profile')
	})
})

app.get('/profile/delete/:id',function(req,res){
	let idProfileDelete = req.params.id;
	db.run(`DELETE FROM profile WHERE id = ${idProfileDelete}`,function(err){
		if(err){
			console.log(err)
		}
	})
	res.redirect('/profile')
})

//Addresses

app.get('/addresses',function(req,res){
	db.all(`SELECT addresses.id, addresses.street, addresses.city, addresses.zipcode, addresses.contact_id, contacts.name FROM addresses LEFT JOIN contacts ON addresses.contact_id = contacts.id`,function(err,rows){
		if(err){
			console.log(err);
		}
		else{
			db.all(`SELECT * FROM contacts`,function(err,rows1){
				if(err){
					console.log(err);
				}
				else{
					// console.log(rows1[0].id);
					res.render('addresses.ejs',{dataJsonAddresses:rows,dataJsonContactId:rows1});
				}
			})
			console.log('addresses render success');
		}
	})
})

app.post('/addresses', function (req, res) {
  db.run(`INSERT INTO addresses (street,city,zipcode,contact_id) VALUES('${req.body.street}','${req.body.city}','${req.body.zipcode}','${req.body.contact_id}')`,function(err){
		if(err){
			console.log(err);
		}
	})
	res.redirect('/addresses')
})

app.get('/addresses/edit/:id',function(req,res){
	db.all(`SELECT * FROM addresses WHERE id = ${req.params.id}`,function(err,rows){
		if(err){
			console.log(err);
		}
		else {
			db.all('SELECT * FROM contacts',function(err,rows1){
				if(err){
					console.log(err);
				}
				else{
					res.render('editAddress.ejs',{dataJsonAddresses:rows,dataJsonContactId:rows1});
				}
			})
		}
	})
	let idAddressesEdit = req.params.id;
	app.post('/addresses/edit/:id',function(req,res){
		db.run(`UPDATE addresses SET street = '${req.body.street}', city = '${req.body.city}', zipcode = '${req.body.zipcode}', contact_id = ${req.body.contact_id} WHERE id = ${idAddressesEdit}`,function(err){
			if(err){
				console.log(err);
			}
		})
		res.redirect('/addresses')
	})
})

app.get('/addresses/delete/:id',function(req,res){
	let idAddressesDelete = req.params.id;
	db.run(`DELETE FROM addresses WHERE id = ${idAddressesDelete}`,function(err){
		if(err){
			console.log(err)
		}
	})
	res.redirect('/addresses')
})

//Listening on which server

app.listen(3000,function(){
    console.log('Example app listening on port 3000!')
})
