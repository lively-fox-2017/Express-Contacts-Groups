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

	static getAllAddresss(callback) {
		db.all('SELECT * FROM addresses', function(err, rows){
			let addresses = [];
			rows.forEach((row) => {
				let address = new Address(row.id, row.street, row.city, row.zipcode, row.id_contacts);
				addresses.push(address);	
			})
				callback(addresses);
  		});
	}

	static getByIDAddress(reqParams, callback) {
		db.get(`SELECT * FROM addresses WHERE id = ${reqParams}`, function(err, rows){
			let contact = new Address(rows.id, rows.name, rows.company, rows.telp_number, rows.email);
			callback(contact);
		});
	}

	static insertAddress(street, city, zipcode, id_contacts, callback){
		db.run(`INSERT INTO addresses (street, city, zipcode, id_contacts) VALUES ('${street}', '${city}', '${zipcode}', '${id_contacts}')`, function(err, rows){
			callback();
		});
	}

	static updateAddress(street, city, zipcode, id_contacts, reqParams, callback){
		db.run(`UPDATE addresses SET street = '${street}', city = '${city}', zipcode = '${zipcode}', id_contacts = '${id_contacts}' WHERE id = ${reqParams}`, function(err, rows){
			callback();
		});
	}

	static deleteAddress(reqParams, callback) {
		db.run(`DELETE FROM addresses WHERE id = ${reqParams}`, function(err, rows){
			callback();
		});
	}

	// static getaddresses(params, cb) {
	// 	db.all(`SELECT * FROM addresses WHERE id_contacts = ${params}`, function(err, rows1){
 //    		db.all(`SELECT * FROM contacts WHERE id = ${params}`, function(err, rows2){
 //    			cb(rows1, rows2);
 //    		});
 //  		});
	// }
}

module.exports = Address;