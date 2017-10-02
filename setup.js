// // sqlite3
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('data/data.db')

function createRow(){

	db.run(`CREATE TABLE IF NOT EXISTS Contacts(id INTEGER PRIMARY KEY, name TEXT, company TEXT, telp_number TEXT, email TEXT)`,function(err){
		if(err != null){
			console.log('err create table Contacts')
		}
		console.log(err);
			console.log(`Contacts table created`)
	})

	db.run(`CREATE TABLE IF NOT EXISTS Groups(id INTEGER PRIMARY KEY, name_of_group TEXT)`,function(err){
		if(err){
			console.log('err create table Groups')
		}
			console.log(`Groups table created`)
	})

	db.run(`CREATE TABLE IF NOT EXISTS Profile(id INTEGER PRIMARY KEY, username TEXT, password TEXT)`,function(err){
		if(err){
			console.log('err create table Profile')
		}
			console.log(`Profile table created`)
	})

	db.run(`CREATE TABLE IF NOT EXISTS Addresses(id INTEGER PRIMARY KEY, street TEXT, city TEXT, zipcode INTEGER)`,function(err){
		if(err){
			console.log('err create table Addresses')
		}
			console.log(`Addresses table created`)
	})

}

//createRow()

//let alter_table_Contacts = `ALTER TABLE Contacts ADD (username TEXT, firstname TEXT, lastname TEXT)`
let alter_table_Addresses = `ALTER TABLE Addresses ADD id_Contacts INTEGER REFERENCES Contacts('id')`

function createAlterTable(){
	db.run(alter_table_Addresses, (err) => {
		if(err){
			console.log('err alter table Addresses')
		}
		console.log('alter table Addresses succes')
	})
}

//createAlterTable()

// drop column
let dropCol = `ALTER TABLE Profile DROP COLUMN id_Contacts`

function dropColumn(){
	db.run(dropCol,(err)=>{
		if(err){
			console.log('err drop column')
		}else{
			console.log(`drop column succes`)
		}
	})
}

//dropColumn()

//*** unique index
// CREATE UNIQUE INDEX your_unique_index ON your_table(column_name);
let uniqueInd = `CREATE UNIQUE INDEX unique_name ON Profile(id_Contacts);`

function uniqueIndex(){
	db.run(uniqueInd,(err)=>{
		if(err){
			console.log(`unique index error`)
		}else{
			console.log(`unique index succes`)
		}
	})
}

//uniqueIndex()
