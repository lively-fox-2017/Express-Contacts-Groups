const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/data.db')

class Contacts {

	constructor(data){
		this.id = data['id']
		this.name = data['name']
		this.company = data['company']
		this.telp_number = data['telp_number']
		this.email = data['email']
	}

	// Tampilin data semua Contacts

	static findAll(){

		let promise = new Promise(function(resolve, reject){

			let query = `SELECT * FROM Contacts`

			db.all(query, function(err, rows){
				let contacts = rows.map(function(row){
					return new Contacts(row)
				})

				if(!err){
					resolve(contacts)
				}else{
					reject(err)
				}

			})
		})

		return promise

	}

	// Ambil ID dari Contacts

	static findById(id){

		let promise = new Promise(function(resolve, reject){

			let query = `SELECT * FROM Contacts WHERE id = ${id}`

			db.all(query, function(err, rows){
				let contacts = rows.map(function(row){
					return new Contacts(row)
				})

				if(!err){
					resolve(contacts)
				}else{
					reject(err)
				}

			})

		})

		return promise

	}

	// Tampilin data dari Addresses

	static findAddress(id){

		let promise = new Promise(function(resolve, reject){

			let query = `SELECT * FROM Addresses WHERE Addresses.contact_id = ${id}`

			db.all(query, function(err, rows){
				if(!err){
					resolve(rows)
				}else{
					reject(err)
				}
			})

		})

		return promise

	}

	static save(param){

		let promise = new Promise(function(resolve, reject){

			let query = `INSERT INTO Contacts (name, company, telp_number, email) VALUES (
				'${param.name}',
				'${param.company}',
				'${param.telp_number}',
				'${param.email}'
			)`

			db.run(query, function(err, rows){
				if(!err){
					resolve()
				}else{
					reject(err)
				}

			})

		})

		return promise

	}

	static saveAddress(param, id){

		let promise = new Promise(function(resolve, reject){

			let query = `INSERT INTO Addresses (street, city, zipcode, contact_id) VALUES (
				'${param.street}',
				'${param.city}',
				'${param.zipcode}',
				${id}
			)`

			db.run(query, function(err, rows){
				if(!err){
					resolve()
				}else{
					reject()
				}
			})

		})

		return promise

	}

	static update(param, id){

		let promise = new Promise(function(resolve, reject){

			let query = `UPDATE Contacts SET name = '${param.name}', company = '${param.company}', telp_number = '${param.telp_number}', email = '${param.email}' WHERE id = ${id}`

			db.run(query, function(err, rows){
				if(!err){
					resolve()
				}else{
					reject()
				}
			})

		})

		return promise

	}

	static delete(id){

		let promise = new Promise(function(resolve, reject){

			let query = `DELETE FROM Contacts WHERE id = ${id}`

			db.run(query, function(err, rows){
				if(!err){
					resolve()
				}else{
					reject()
				}
			})

		})

		return promise

	}

}

module.exports = Contacts