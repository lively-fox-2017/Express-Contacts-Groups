// sqlite3
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');

class Address {
	constructor(id, street, city, zipcode, id_contacts) {
		this.id = id
		this.street = street
		this.city = city
		this.zipcode = zipcode
		this.id_contacts = id_contacts
	}

	static getAllAddresss() {
		return new Promise((resolve, reject) => {
			db.all('SELECT * FROM addresses', function(err, rows){
			let addresses = [];
			rows.forEach((row) => {
				let address = new Address(row.id, row.street, row.city, row.zipcode, row.id_contacts);
				addresses.push(address);	
			})
				resolve(addresses);
  			});
		});
	}

	static getByIDAddress(reqParams) {
		return new Promise((resolve, reject) => {
			db.get(`SELECT * FROM addresses WHERE id = ${reqParams}`, function(err, rows){
			let address = new Address(rows.street, rows.city, rows.zipcode, rows.id_contacts);
			resolve(address);
			});
		});
	}

	static insertAddress(street, city, zipcode, id_contacts){
		return new Promise((resolve, reject) => {
			db.run(`INSERT INTO addresses (street, city, zipcode, id_contacts) VALUES ('${street}', '${city}', '${zipcode}', '${id_contacts}')`, function(err, rows){
			resolve(rows);
			});
		});
	}

	static updateAddress(street, city, zipcode, id_contacts, reqParams){
		return new Promise((resolve, reject) => {
			db.run(`UPDATE addresses SET street = '${street}', city = '${city}', zipcode = '${zipcode}', id_contacts = '${id_contacts}' WHERE id = ${reqParams}`, function(err, rows){
			resolve(rows);
			});
		});
	}

	static deleteAddress(reqParams) {
		return new Promise((resolve, reject) => {
			db.run(`DELETE FROM addresses WHERE id = ${reqParams}`, function(err, rows){
			resolve(rows);
			});
		});
	}

	static getAddressByIDContact(reqParams) {
		return new Promise((resolve, reject) => {
			db.all(`SELECT * FROM addresses WHERE id_contacts = ${reqParams}`, function(err, rows){
    			resolve(rows);
  			});
		});
	}
}

module.exports = Address;