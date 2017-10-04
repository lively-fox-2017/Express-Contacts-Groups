"use strict"

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/data.db');

class ContactsGroups {
	constructor(id, contactId, groupId) {
		this._id = id;
		this._contactId = contactId;
		this._groupId = groupId;
	}
	
	get id() {
		return this._id;
	}

	get contactId() { 
		return this._contactId;
	}

	get groupId() {
		return this._groupId;
	}

	static createRecord(values) {
		let query = `INSERT INTO contacts_groups (contactId, groupId) VALUES (${values.join(', ')})`;

		return new Promise((resolve, reject) => {
			db.exec(query, err => {
				if (err) reject(err);
				resolve(/*what?*/);
			});
		});
	}

	static readRecord(id) {
		let query = `SELECT * FROM contacts_groups WHERE id = ${id}`;
		
		return new Promise((resolve, reject) => {
			db.get(query, (err, rec) => {
				if (err) reject(err);

				let contactsGroup = new ContactsGroups(rec.contactId, rec.groupId);
				resolve(contactsGroup);
			});
		});
	}

	static updateRecord(id, values) {
		let query = `UPDATE contacts_groups SET contactId = '${values[0]}', groupId = '${values[1]}' WHERE id = ${id}`;

		return new Promise((resolve, reject) => {
			db.exec(query, err => {
				if (err) reject(err);
				resolve(/*what?*/);
			});
		});
	}

	static deleteRecord() {
		let query = `DELETE FROM contacts_groups WHERE id = ${id}`;

		return new Promise((resolve, reject) => {
			db.exec(query, err => {
				if (err) reject(err);
				resolve(/*what?*/);
			});
		});
	}

	static readAllRecords() {
		let query = `SELECT * FROM contacts_groups`;

		return new Promise((resolve, reject) => {
			db.all(query, (err, recs) => {
				if (err) reject(err);

				let contactsGroups = recs.map(rec => new ContactsGroups(rec.id, rec.contactId, rec.groupId));
				resolve(contactsGroups);
			});
		});
	}

	static findByColumnValue(column, value) {
		let query = `SELECT * FROM contacts_groups WHERE ${column} = ${value}`;

		return new Promise((resolve, reject) => {
			db.all(query,(err, recs) => {
				if (err) reject(err);
				let contactsGroups = recs.map(rec => new ContactsGroups(rec.id, rec.contactId, rec.groupId));
				resolve(contactsGroups);
			});
		});
	}
}

module.exports = ContactsGroups;