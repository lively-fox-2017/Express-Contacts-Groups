const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
  res.render('index')
})
//Handling CRUD contact
app.get ('/contacts', function (req, res) {
	let query = `SELECT * FROM Contacts`
	db.all(query, function (err, data) {
		// let groups = []
		// data.forEach(i => {
		// 	db.all(`select * from Groups where id_contact = ${i.id}`, (err,dbGroup)=>{
		// 	console.log(dbGroup)
		// 		groups.push(dbGroup)
		// 	})
		// })
		// res.send(groups)
    	if (!err) {
    		db.all(`SELECT * FROM Groups`, (err,data_groups) => {
    			// res.send(data)
      			res.render('contact', {contact: data, groups:data_groups});
    		})
    	}
  	});
});
app.post ('/contacts/add/groups/:id', function (req, res) {
	db.run(`INSERT INTO ContactGroups (id_contact, id_group) VALUES ('${req.params.id}','${req.body.id_group}')`)
	res.redirect('/contacts')
});
app.get ('/contacts/groups/:id', function (req, res) {
	let query = `SELECT ContactGroups.*,Groups.names_of_groups FROM ContactGroups LEFT JOIN Groups ON ContactGroups.id_group = Groups.id where ContactGroups.id_contact = ${req.params.id}`
	db.all(query, function (err, data) {
    	if (!err) {
    		db.all(`select * from Groups`, (err,groups)=>{
    			db.each(`select * from Contacts where id = '${req.params.id}'`, (err,contacts) => {
		  			res.render('contacts_groups', {contactGroup:data,group: groups,contact:contacts});
    			})
    		})
    	}
  	});
});
app.post('/contacts', function(req, res) {
	let query = `INSERT INTO Contacts (name, company, tlp_number, email) VALUES
        ("${req.body.name}","${req.body.company}","${req.body.tlp_number}","${req.body.email}")`
	db.run(query, (err,data) => {
		if(!err){
			res.redirect('/contacts')
		}
	});
})
app.get("/contacts/edit/:id", function(req,res){
	let query = `SELECT * FROM Contacts WHERE id = '${req.params.id}'` 
	db.each(query, function(err,rows){
    	if(!err){
    		res.render("edit_contact",{data:rows})
    	}
  	});
});
app.post('/contacts/edit/:id', function(req,res) {
	let query = `UPDATE  Contacts SET name = "${req.body.name}", company = "${req.body.company}",
          tlp_number = "${req.body.tlp_number}",email = "${req.body.email}" WHERE id = ${req.params.id}`
	db.run(query);
	res.redirect('/contacts');
});
app.get('/contacts/address/:id', (req,res) => {
	let query = `SELECT * FROM Address where id_contact = '${req.params.id}'`
	db.all(query, (err, data) => {
		db.each(`select * from Contacts where id = '${req.params.id}'`, (err,data_contacts) => {
			res.render('contacts_address', {address:data, contact:data_contacts})
		})
	})
})
app.get('/contacts/delete/:id', function(req,res){
	let query = `DELETE FROM Contacts WHERE id = '${req.params.id}'`
	db.run(query)
	res.redirect('/contacts')
});

//Handling CRUD Profile
app.get ('/profiles', function (req, res) {
	let query = `SELECT Profiles.*, Contacts.* FROM Profiles LEFT JOIN Contacts ON Profiles.id=Contacts.id`
	db.all(query, function (err, data_profiles) {
   		// res.send(data_profiles)
    	if (!err) {
    		let q_contact = `SELECT * FROM Contacts`
    		db.all(q_contact, (err, data_contacts)=>{
	    		res.render('profile', {profiles: data_profiles, contacts:data_contacts, msg:''});
    		})
    	}
  	});
});
app.post('/profiles', function(req, res) {
	let query = `INSERT INTO Profiles (username, password, id_contact) VALUES ("${req.body.username}","${req.body.password}","${req.body.id_contact}")`
	db.run(query, (err)=>{
		if(!err){
			res.redirect('/profiles')
		}
		else {
			if(err.code == 'SQLITE_CONSTRAINT'){
				let query = `SELECT Profiles.*, Contacts.* FROM Profiles LEFT JOIN Contacts ON Profiles.id=Contacts.id`
				db.all(query, function (err, data_profiles) {
					if (!err) {
						let q_contact = `SELECT * FROM Contacts`
						db.all(q_contact, (err, data_contacts)=>{
							res.render('profile', {profiles: data_profiles, contacts:data_contacts, msg:'<p style="color:red">ID Contact sudah digunakan!</p>'});
						})
					}
				})
			}
		}
	});
})
	// let idContact = req.body.id_contact
	// let q_profile = `Select * from Profiles where id_contact = ${idContact}`
	// db.each(q_profile, (err, data) => {
	// 	if(!err){
	// 		if(data.id == idContact){
	// 			let query = `SELECT Profiles.*,Contacts.id as id_contact,Contacts.name 
	// 						FROM Profiles LEFT JOIN Contacts ON Profiles.id=Contacts.id`
	// 			db.all(query, function (err, data_profiles) {
	// 		    	if (!err) {
	// 		    		let q_contact = `SELECT * FROM Contacts`
	// 		    		db.all(q_contact, (err, data_contacts)=>{
	// 			    		res.render('profile', {profiles: data_profiles, contacts:data_contacts, msg:'<p style="color:red">ID Contact sudah digunakan!</p>'});
	// 		    		})
	// 		    	}
	// 		  	});
	// 		}
	// 	} 
	// 	else {
	// 		console.log(err)
	// 	}
	// }, (err, found) => {
	// 	if(!found){
	// 		let query = `INSERT INTO Profiles (username, password, id_contact) VALUES ("${req.body.username}","${req.body.password}","${req.body.id_contact}")`
	// 		db.run(query);
	// 		res.redirect('/profile')
	// 	}
	// })
app.get("/profiles/edit/:id", function(req,res){
  	let query = `SELECT Profiles.*,Contacts.id as id_contact,Contacts.name 
				FROM Profiles LEFT JOIN Contacts ON Profiles.id=Contacts.id WHERE Profiles.id = '${req.params.id}'`
  	db.each(query, function(err,rows){
	    if(!err){
    		let q_contact = `SELECT * FROM Contacts`
    		db.all(q_contact, (err, data_contacts)=>{
		      	res.render("edit_profile",{data:rows, contacts:data_contacts})
			})
	    }
	});
});
app.post('/profiles/edit/:id', function(req,res) {
	let query = `UPDATE Profiles SET username = "${req.body.username}", password = "${req.body.password}", id_contact = "${req.body.id_contact}" WHERE id = ${req.params.id}`
	db.run(query);
    res.redirect('/profile');
});
app.get('/profiles/delete/:id', function(req,res){
	let query = `DELETE FROM Profiles WHERE id_contact = '${req.params.id}'`
	db.run(query)
	res.redirect('/profiles')
});
//Handling CRUD Address
app.get ('/address', function (req, res) {
	let query = `SELECT Address.*,Contacts.id as idContact,Contacts.name FROM Address LEFT JOIN Contacts ON Address.id_contact = Contacts.id`
	db.all(query, function (err, data) {
	    if (!err) {
	    	db.all(`Select * from Contacts`, (err,data_contacts) => {
		      	res.render('address', {address: data, contacts:data_contacts});
	    	})
	    }
	});
});
app.post('/address', function(req, res) {
	let query = `INSERT INTO Address (street, city, zipcode, id_contact) VALUES
        		("${req.body.street}","${req.body.city}","${req.body.zipcode}","${req.body.id_contact}")`
	db.run(query);
	res.redirect('/address')
})
app.post('/address/add/:id', function(req, res) {
	let query = `INSERT INTO Address (street, city, zipcode, id_contact) VALUES
        		("${req.body.street}","${req.body.city}","${req.body.zipcode}","${req.params.id}")`
	db.run(query);
	res.redirect('/address')
})
app.get("/address/edit/:id", function(req,res){
	let query = `SELECT Address.*,Contacts.id as idContact,Contacts.name FROM Address LEFT JOIN Contacts ON Address.id_contact = Contacts.id WHERE Address.id = '${req.params.id}'`
	db.each(query, function(err,rows){
	    if(!err){
	    	db.all(`Select * from Contacts`, (err,data_contacts) => {
		    	res.render("edit_address",{data:rows, contacts:data_contacts})
	    	})
	    }
	});
});
app.post('/address/edit/:id', function(req,res) {
	let query = `UPDATE  Address SET street = "${req.body.street}", city = "${req.body.city}",
				zipcode = "${req.body.zipcode}", id_contact = "${req.body.id_contact}"  WHERE id = ${req.params.id}`
	db.run(query);
	res.redirect('/address');
});
app.get('/address/delete/:id', function(req,res){
	let query = `DELETE FROM Address WHERE id = '${req.params.id}'`
	db.run(query)
	res.redirect('/address')
});
//Handling CRUD Group
app.get ('/groups', function (req, res) {
	let query = `SELECT * FROM Groups`
	db.all(query, function (err, data) {
	    if (!err) {
	    	res.render('group', {group: data});
	    }
  	});
});
app.get('/groups/assign_contacts/id:', (req,res) => {
	let query = `select * from Contacts`
	db.run()
	res.redirect('/groups')
})
app.post('/groups', function(req, res) {
  	let query = `INSERT INTO Groups (names_of_groups) VALUES ("${req.body.names_of_groups}")`
  	db.run(query);
	res.redirect('/groups')
})
app.get("/groups/edit/:id", function(req,res){
	let query = `SELECT * FROM Groups WHERE id = '${req.params.id}'`
	db.each(query, function(err,rows){
	    if(!err){
	    	res.render("edit_group",{data:rows})
	    }
  	});
});
app.post('/groups/edit/:id', function(req,res) {
	let query = `UPDATE  Groups SET names_of_groups = "${req.body.names_of_groups}" WHERE id = ${req.params.id}`
	db.run(query);
  	res.redirect('/groups');
});
app.get('/groups/delete/:id', function(req,res){
	let query = `DELETE FROM Groups WHERE id = '${req.params.id}'`
	db.run(query)
	res.redirect('/groups')
});
// Port listening
app.listen(3000,()=>{
  console.log('Magic Port 3000')
});
