"use strict"

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/data.db');

class Profiles {
	constructor(id, username, password, contactId) {
		this._id = id;
		this._username = username;
		this._password = password;
		this._contactId = contactId; 
	}

	get id() {
		return this._id;
	}

	get username() { 
		return this._username;
	}

	get password() {
		return this._password;
	}

	get contactId() {
		return this._contactId;
	}

	static createRecord(values) {
		let query = `INSERT INTO profiles (username, password, contactId) VALUES (${values.join(', ')})`;

		return new Promise((resolve, reject) => {
			db.exec(query, err => {
				if (err) reject(err);
				resolve(/*what?*/);
			});
		});
	}

	static readRecord(id) {
		let query = `SELECT * FROM profiles WHERE id = ${id}`;
		
		return new Promise((resolve, reject) => {
			db.get(query, (err, rec) => {
				if (err) reject(err);

				let profile = new Profiles(rec.id, rec.username, rec.password, rec.contactId);
				resolve(profile);
			});
		});
	}

	static updateRecord(id, values) {
		let query = `UPDATE profiles SET username = '${values[0]}', password = '${values[1]}', contactId = '${values[2]}' WHERE id = ${id}`;

		return new Promise((resolve, reject) => {
			db.exec(query, err => {
				if (err) reject(err);
				resolve(/*what?*/);
			});
		});
	}

	static deleteRecord(id) {
		let query = `DELETE FROM profiles WHERE id = ${id}`;

		return new Promise((resolve, reject) => {
			db.exec(query, err => {
				if (err) reject(err);
				resolve(/*what?*/);
			});
		});
	}

	static readAllRecords() {
		let query = `SELECT * FROM profiles`;

		return new Promise((resolve, reject) => {
			db.all(query, (err, recs) => {
				if (err) reject(err);

				let profiles = recs.map(rec => new Profiles(rec.id, rec.username, rec.password, rec.contactId));
				resolve(profiles);
			});
		});
	}
}

module.exports = Profiles;