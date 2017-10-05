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

	static getAllContacts() {
		return new Promise((resolve, reject) => {
			db.all('SELECT * FROM contacts', function(err, rows){
			let contacts = [];
			rows.forEach((row) => {
				let contact = new Contact(row.id, row.name, row.company, row.telp_number, row.email);
				contacts.push(contact);	
			});
				resolve(contacts);
  			});
		});
	}

	static getByIDContact(reqParams) {
		return new Promise((resolve, reject) => {
			db.get(`SELECT * FROM contacts WHERE id = ${reqParams}`, function(err, rows){
			let contact = new Contact(rows.id, rows.name, rows.company, rows.telp_number, rows.email);
			resolve(contact);
			});
		});
	}

	static insertContact(name, company, telp_number, email){
		return new Promise((resolve, reject) => {
			db.run(`INSERT INTO contacts (name, company, telp_number, email) VALUES ('${name}', '${company}', '${telp_number}', '${email}')`, function(err, rows){
			resolve(rows);
			});
		});
	}

	static updateContact(name, company, telp_number, email, reqParams){
		return new Promise((resolve, reject) => {
			db.run(`UPDATE contacts SET name = '${name}', company = '${company}', telp_number = '${telp_number}', email = '${email}' WHERE id = ${reqParams}`, function(err, rows){
			resolve(rows);
			});
		});
	}

	static deleteContact(reqParams) {
		return new Promise((resolve, reject) => {
			db.run(`DELETE FROM contacts WHERE id = ${reqParams}`, function(err, rows){
			resolve(rows);
			});
		});
	}
}

module.exports = Contact;