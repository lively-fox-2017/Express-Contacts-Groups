// sqlite3
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');

class Contact {
	constructor(id, name, company, telp_number, email) {
		this.id = id
		this.name = name
		this.company = company
		this.telp_number = telp_number
		this.email = email
	}

	static getAll(cb) {
		db.all('SELECT * FROM contacts', function(err, rows){
			let result = [];
			rows.forEach((row) => {
				let contact = new Contact(row.id, row.name, row.company, row.telp_number, row.email);
				result.push(contact);	
			})
				cb(err, result);
  		});
	}

	static create(name, company, telp_number, email){
		db.run(`INSERT INTO contacts (name, company, telp_number, email) VALUES ('${name}', '${company}', '${telp_number}', '${email}')`);
	}

	static getByID(params, cb) {
		db.get(`SELECT * FROM contacts WHERE id = ${params}`, function(err, rows){
			let contact = new Contact(rows.id, rows.name, rows.company, rows.telp_number, rows.email);
			cb(contact);
		});
	}

	static update(name, company, telp_number, email, params){
		db.run(`UPDATE contacts SET name = '${name}', company = '${company}', telp_number = '${telp_number}', email = '${email}' WHERE id = ${params}`);
	}

	static delete(params) {
		db.run(`DELETE FROM contacts WHERE id = ${params}`);
	}

	static getaddresses(params, cb) {
		db.all(`SELECT * FROM addresses WHERE id_contacts = ${params}`, function(err, rows1){
    		db.all(`SELECT * FROM contacts WHERE id = ${params}`, function(err, rows2){
    			cb(rows1, rows2);
    		});
  		});
	}
}

module.exports = Contact;