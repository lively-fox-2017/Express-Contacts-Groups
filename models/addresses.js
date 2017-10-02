"use strict"

const Crud = require('./crud');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/data.db');

class Addresses extends Crud {
	constructor() {
		super('addresses', ['street', 'city', 'zipcode', 'contactId']);
	}

	findAddresses(contactId) { // returns an array
		return new Promise((resolve, reject) => {
			let query = `SELECT * FROM addresses WHERE contactId = ${contactId}`;
			db.all(query, (err, addresses) => {
				if (err) reject(err);
				resolve(addresses);
			});
		});
	}
}

module.exports = Addresses;