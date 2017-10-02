const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/data.db');

db.serialize(() => {
    db.run(
    	'CREATE TABLE IF NOT EXISTS contacts (' +
    	'id INTEGER PRIMARY KEY AUTOINCREMENT, ' + 
    	'name TEXT,' + 
    	'company TEXT,' + 
    	'telp_number TEXT,' +
    	'email TEXT' +
    	');',
    	err => {
    		if (err) throw err;
    		else console.log('Create "contacts" table success');
    });

   	db.run(
		'CREATE TABLE IF NOT EXISTS groups (' +
		'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
		'name_of_group TEXT' +
		');',
		err => {
			if (err) throw err;
			else console.log('Create "groups" table success');
    });

    db.run(
		'CREATE TABLE IF NOT EXISTS profiles (' +
		'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
		'username TEXT,' +
		'password TEXT' +
		');',
		err => {
			if (err) throw err;
			else console.log('Create "profiles" table success');
    });

    db.run(
		'CREATE TABLE IF NOT EXISTS addresses (' +
		'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
		'street TEXT,' +
		'city TEXT,' +
		'zipcode INTEGER' +
		');',
		err => {
			if (err) throw err;
			else console.log('Create "addresses" table success');
    });


    // add one to one contacts-profiles feature
	db.run(
		'ALTER TABLE profiles ADD COLUMN contactId INTEGER REFERENCES contacts(id)',
		err => {
			if (err) throw err;
			else console.log('Add "contactId" column to "profiles" table and set it as foreign key success');
		});

	db.run(
		'CREATE UNIQUE INDEX UC_Profiles ON profiles(contactId)',
		err => {
			if (err) throw err;
			else console.log('Set "contactId" column as unique success');
	});

	// add one to many contacts-addresses feature
	db.run(
		'ALTER TABLE addresses ADD COLUMN contactId INTEGER REFERENCES contacts(id)',
		err => {
			if (err) throw err;
			else console.log('Add "contactId" column to "addresses" table and set it as foreign key success');
		});

	// add many to many contacts-groups
    db.run(
    	'CREATE TABLE IF NOT EXISTS contacts_groups (' +
    	'id INTEGER PRIMARY KEY AUTOINCREMENT, ' + 
    	'contactId INTEGER REFERENCES contacts(id), ' + 
    	'groupId INTEGER REFERENCES groups(id)' +
    	');',
    	err => {
    		if (err) throw err;
    		else console.log('Create "contacts_groups" table success');
    });

    db.close();
});