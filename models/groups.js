"use strict"

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/data.db');

class Groups {
	constructor(id, name_of_group) {
		this._id = id;
		this._name_of_group = name_of_group;
	}

	get id() {
		return this._id;
	}

	get name_of_group() { 
		return this._name_of_group;
	}

	static createRecord(values) {
		let query = `INSERT INTO groups (name_of_group) VALUES (${values.join(', ')})`;

		return new Promise((resolve, reject) => {
			db.exec(query, err => {
				if (err) reject(err);
				resolve(/*what?*/);
			});
		});
	}

	static readRecord(id) {
		let query = `SELECT * FROM groups WHERE id = ${id}`;
		
		return new Promise((resolve, reject) => {
			db.get(query, (err, rec) => {
				if (err) reject(err);

				let group = new Groups(rec.id, rec.name_of_group);
				resolve(group);
			});
		});
	}

	static updateRecord(id, values) {
		let query = `UPDATE groups SET name_of_group = '${values[0]}' WHERE id = ${id}`;

		return new Promise((resolve, reject) => {
			db.exec(query, err => {
				if (err) reject(err);
				resolve(/*what?*/);
			});
		});
	}

	static deleteRecord(id) {
		let query = `DELETE FROM groups WHERE id = ${id}`;

		return new Promise((resolve, reject) => {
			db.exec(query, err => {
				if (err) reject(err);
				resolve(/*what?*/);
			});
		});
	}

	static readAllRecords() {
		let query = `SELECT * FROM groups`;

		return new Promise((resolve, reject) => {
			db.all(query, (err, recs) => {
				if (err) reject(err);

				let groups = recs.map(rec => new Groups(rec.id, rec.name_of_group));
				resolve(groups);
			});
		});
	}
}

module.exports = Groups;