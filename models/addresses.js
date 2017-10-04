"use strict"

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/data.db');

class Addresses {
	constructor(id, street, city, zipcode, contactId) {
		this._id = id;
		this._street = street;
		this._city = city;
		this._zipcode = zipcode;
		this._contactId = contactId;
	}
	
	get id() {
		return this._id;
	}

	get street() { 
		return this._street;
	}

	get city() {
		return this._city;
	}

	get zipcode() {
		return this._zipcode;
	}

	get contactId() {
		return this._contactId;
	}

	static createRecord(values) {
		let query = `INSERT INTO addresses (street, city, zipcode, contactId) VALUES (${values.join(', ')})`;
		return new Promise((resolve, reject) => {
			db.run(query, err => {
				if (err) reject(err);
				resolve();
			});
		});
	}

	static readRecord(id) {
		let query = `SELECT * FROM addresses WHERE id = ${id}`;

		return new Promise((resolve, reject) => {
			db.get(query, (err, rec) => {
				if (err) reject(err);

				let address = new Addresses(rec.id, rec.street, rec.city, rec.zipcode, rec.contactId);
				resolve(address);
			});
		});
	}

	static updateRecord(id, values) {
		let query = `UPDATE addresses SET street = '${values[0]}', city = '${values[1]}', zipcode = '${values[2]}' WHERE id = ${id}`;

		return new Promise((resolve, reject) => {
			db.exec(query, err => {
				if (err) reject(err);
				resolve();
			});
		});
	}

	static deleteRecord(id) {
		let query = `DELETE FROM addresses WHERE id = ${id}`;

		return new Promise((resolve, reject) => {
			db.exec(query, err => {
				if (err) reject(err);
				resolve();
			});
		});
	}

	static readAllRecords() {
		let query = `SELECT * FROM addresses`;

		return new Promise((resolve, reject) => {
			db.all(query, (err, recs) => {
				if (err) reject(err);
				let addresses = recs.map(rec => new Addresses(rec.id, rec.street, rec.city, rec.zipcode, rec.contactId));
				resolve(addresses);
			});
		});
	}

	static findByColumnValue(column, value) {
		let query = `SELECT * FROM addresses WHERE ${column} = ${value}`;

		return new Promise((resolve, reject) => {
			db.all(query,(err, recs) => {
				if (err) reject(err);

				let addresses = recs.map(rec => new Addresses(rec.id, rec.street, rec.city, rec.zipcode, rec.contactId));
				resolve(addresses);
			});
		});
	}
}

module.exports = Addresses;