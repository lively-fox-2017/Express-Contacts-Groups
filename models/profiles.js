"use strict"

const Crud = require('./crud');

class Profiles extends Crud {
	constructor() {
		super('profiles', ['username', 'password', 'contactId']);
	}

	// // override Crud method
	// readRecords() {
	// 	return new Promise((resolve, reject) => {
	// 		let query = `SELECT profiles.*, contacts.name, FROM profiles LEFT JOIN contacts ON profiles.contactId = contacts.id`;
	// 		db.all(query, (err, records) => {
	// 			if (err) reject(err);
	// 			console.log(records); // array of objects
	// 			resolve(records);
	// 		});
	// 	});
	// }

	// // override Crud method
	// readRecord(id) {
	// 	return new Promise((resolve, reject) => {
	// 		let query = `SELECT profiles.*, contacts.name, FROM profiles LEFT JOIN contacts ON profiles.contactId = contacts.id AND profiles.id = ${id}`;
	// 		db.get(query, (err, record) => {
	// 			if (err) reject(err);
	// 			resolve(record); // object
	// 		});
	// 	});
	// }

	// // override Crud method
	// createRecord() {
	// 	return new Promise((resolve, reject) => {
	// 		columnValues = columnValues.map(cv => '\'' + cv + '\'').join(', ');
	// 		let colStatement = this._columns.join(', ')
	// 		let query = `INSERT INTO ${this._table} (${colStatement}) VALUES (${columnValues})`;

	// 		db.run(query, err => {
	// 			if (err) reject(err);
	// 			resolve();
	// 		})
	// 	});
	// }
}

// let profiles =  new Profiles();
// profiles.readRecords().catch(err);

module.exports = Profiles;