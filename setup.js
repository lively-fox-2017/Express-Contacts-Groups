let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('data.db');

db.serialize(function(){
	db.run('CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, company TEXT, telp_number TEXT, email TEXT)',function(err){
		if(err){
			console.log(err);
		}
		else{
			console.log('data created')
		}
	});
	db.run('CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group TEXT)',function(err){
		if(err){
			console.log(err);
		}
		else{
			console.log('data created')
		}
	});
	db.run('CREATE TABLE IF NOT EXISTS profile (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)',function(err){
		if(err){
			console.log(err);
		}
		else{
			console.log('data created')
		}
	});
	db.run('CREATE TABLE IF NOT EXISTS addresses (id INTEGER PRIMARY KEY AUTOINCREMENT, street TEXT, city TEXT, zipcode INTEGER)',function(err){
		if(err){
			console.log(err);
		}
		else{
			console.log('data created')
		}
	});

})

// ALTER TABLE FUNCTION
function alterTable(){
	db.run('ALTER TABLE addresses ADD contact_id INTEGER REFERENCES contacts(id)',function(err){
		if(err){
			console.log(err);
		}
		else{
			// db.run('CREATE UNIQUE INDEX unique_id ON profile(contact_id)',function(err){
			// 	if(err){
			// 		console.log(err);
			// 	}
			// 	else{
			// 		console.log('Unique "contact_id" has created');
			// 	}
			// })
			console.log('Alter Table Succeed');
		}
	})
}

// DROP CONTACTS TABLE FUNCTION
function dropTableContacts(){
	db.run('DROP TABLE contacts',function(err){
		if(err){
			console.log(err);
		}
		else{
			console.log('Drop Succeed');
		}
	})
}

// DROP PROFILE TABLE FUNCTION
function dropTableProfile(){
	db.run('DROP TABLE profile',function(err){
		if(err){
			console.log(err);
		}
		else{
			console.log('Drop Succeed');
		}
	})
}

// dropTableContacts();
// dropTableProfile();
alterTable();
