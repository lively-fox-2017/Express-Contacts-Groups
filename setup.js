var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');


function createTableContacts(){
	db.run("Create table if not exists Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, company TEXT, telp_number TEXT, email TEXT);", function(err){
		if(err){
			console.log(err + 'ini create tabel')
		}else{
			console.log('Table Contacts berhasil dibuat')
		}
	});

}
	
function createTableProfiles(){
	db.run("Create table if not exists Profile (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT );", function(err){
		if(err){
			console.log(err + 'ini create tabel')
		}else{
			console.log('Table Profile berhasil dibuat')
		}
	});

}


//ONE TO ONE
function alterContactAndProfile(){

	let alter = 'ALTER TABLE Profile ADD contact_id REFERENCES Contacts(id)'
	db.run(alter, (err) =>{
		if(err){
			console.log(err)
		}else{
			console.log('berhasil dibuat foreign keynya')
		}
	})

	let alterUnique = 'create unique index unique_name on Profile(contact_id);'
	db.run(alterUnique, (err) =>{

	})

	let reset = 'ALTER TABLE Profile AUTOINCREMENT=1;'

}

//ONE TO MANY
function alterContactAndAddress(){
	let alter = 'ALTER TABLE Address ADD contact_id REFERENCES Contacts(id)'
	db.run(alter, (err) =>{
		console.log('berhasil dibuat')
	})
}

function createTableGroups(){
	db.run("Create table if not exists Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group TEXT );", function(err){
		if(err){
			console.log(err + 'ini create tabel')
		}else{
			console.log('Table Groups berhasil dibuat')
		}
	});

}

function createTableAddress(){
	db.run("Create table if not exists Address (id INTEGER PRIMARY KEY AUTOINCREMENT, street TEXT, city TEXT, zipcode TEXT );", function(err){
		if(err){
			console.log(err + 'ini create tabel')
		}else{
			console.log('Table Addres berhasil dibuat')
		}
	});
}



	
function insertTest(){
	db.run(`insert into Contacts ( name, company, telp_number, email) values ('wisnu', 'hacktiv8', 'oke', 'oke.com')`, function(err){
			if(err){
			console.log(err + 'ini insert data')
		}
		else{
			console.log('oke')
		}
	})

	db.run(`insert into Profile (username, password) values ('wisnu', '123')`, function(err){
			if(err){
			console.log(err + 'ini insert data')
		}
		else{
			console.log('oke')
		}
	})

	db.run(`insert into Groups ( name_of_group) values ('Junior Developer')`, function(err){
			if(err){
			console.log(err + 'ini insert data')
		}
		else{
			console.log('oke')
		}
	})

	db.run(`insert into Addres ( street, city, zipcode) values ('Jl. Pondok Indah', 'Jak-Sel', '12310')`, function(err){
			if(err){
			console.log(err + 'ini insert data')
		}
		else{
			console.log('oke')
		}
	})

}


// createTableContacts()
// createTableProfiles()
	
// alterContactAndProfile()
// createTableAddress()
alterContactAndAddress()