"use strict"

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/data.db');

class Contacts {
	constructor(id, name, company, telp_number, email) {
		this._id = id;
		this._name = name;
		this._company = company;
		this._telp_number = telp_number;
		this._email = email;
	}

	get id() {
		return this._id;
	}

	get name() { 
		return this._name;
	}

	get company() {
		return this._company;
	}

	get telp_number() {
		return this._telp_number;
	}

	get email() {
		return this._email;
	}

	static createRecord(values) {
		let query = `INSERT INTO contacts (name, company, telp_number, email) VALUES (${values.join(', ')})`;

		return new Promise((resolve, reject) => {
			db.run(query, function(err) {
				if (err) reject(err);
				resolve(this);
			});
		});
	}

	static readRecord(id) {
		let query = `SELECT * FROM contacts WHERE id = ${id}`;
		return new Promise((resolve, reject) => {
			db.get(query, (err, rec) => {
				if (err) reject(err);
				let contact = new Contacts(rec.id, rec.name, rec.company, rec.telp_number, rec.email);
				resolve(contact);
			});
		});
	}

	static updateRecord(id, values) {
		let query = `UPDATE contacts SET name = ${values[0]}, company = ${values[1]}, telp_number = ${values[2]}, email = ${values[3]} WHERE id = ${id}`;

		return new Promise((resolve, reject) => {
			db.run(query, err => {
				if (err) reject(err);
				resolve(/*what?*/);
			});
		});
	}

	static deleteRecord(id) {
		let query = `DELETE FROM contacts WHERE id = ${id}`;

		return new Promise((resolve, reject) => {
			db.run(query, err => {
				if (err) reject(err);
				resolve(/*what?*/);
			});
		});
	}

	static readAllRecords() {
		let query = `SELECT * FROM contacts`;

		return new Promise((resolve, reject) => {
			db.all(query, (err, recs) => {
				if (err) reject(err);

				let contacts = recs.map(rec => new Contacts(rec.id, rec.name, rec.company, rec.telp_number, rec.email));
				resolve(contacts);
			});
		});
	}
}

module.exports = Contacts;