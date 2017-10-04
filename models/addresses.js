// sqlite3
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');

class Address {
	constructor(id, name, company, telp_number, email) {
		this.id = id
		this.name = name
		this.company = company
		this.telp_number = telp_number
		this.email = email
	}

	static getAllContacts(callback) {
		db.all('SELECT * FROM contacts', function(err, rows){
			let contacts = [];
			rows.forEach((row) => {
				let contact = new Contact(row.id, row.name, row.company, row.telp_number, row.email);
				contacts.push(contact);	
			})
				callback(contacts);
  		});
	}

	static getByIDContact(reqParams, callback) {
		db.get(`SELECT * FROM contacts WHERE id = ${reqParams}`, function(err, rows){
			let contact = new Contact(rows.id, rows.name, rows.company, rows.telp_number, rows.email);
			callback(contact);
		});
	}

	static insertContact(name, company, telp_number, email, callback){
		db.run(`INSERT INTO contacts (name, company, telp_number, email) VALUES ('${name}', '${company}', '${telp_number}', '${email}')`, function(err, rows){
			callback();
		});
	}

	static updateContact(name, company, telp_number, email, reqParams, callback){
		db.run(`UPDATE contacts SET name = '${name}', company = '${company}', telp_number = '${telp_number}', email = '${email}' WHERE id = ${reqParams}`, function(err, rows){
			callback();
		});
	}

	static deleteContact(reqParams, callback) {
		db.run(`DELETE FROM contacts WHERE id = ${reqParams}`, function(err, rows){
			callback();
		});
	}

	static getaddresses(params, cb) {
		db.all(`SELECT * FROM addresses WHERE id_contacts = ${params}`, function(err, rows1){
    		db.all(`SELECT * FROM contacts WHERE id = ${params}`, function(err, rows2){
    			cb(rows1, rows2);
    		});
  		});
	}
}

module.exports = Address;