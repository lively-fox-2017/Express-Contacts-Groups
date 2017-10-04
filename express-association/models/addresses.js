const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/data.db')
const Contact = require('./contacts')

class Address {

	constructor(data){
		this.id = data['id']
		this.street = data['street']
		this.city = data['city']
		this.zipcode = data['zipcode']
		this.contact_id = data['contact_id']
		
	}

	getContact(callback){

		Contact.findById(this.contact_id)
		.then(function(contact){
			callback(contact[0])
		})

	}


	static findAll(cb){

		let promise = new Promise(function(resolve, reject){

			let query = `SELECT * FROM Addresses`

			db.all(query, function(err, rows){
				let addresses = rows.map(function(row){
					return new Address(row)
				})

				let count = 0
				addresses.forEach(function(address){
					address.getContact(function(contact){
						address.contact_name = contact.name

						count++

						if(!err){
							resolve(addresses)
						}else{
							reject(err)
						}

					})
				})

			})

		})

		return promise

	}

	static findById(id){

		let promise = new Promise(function(resolve, reject){

			let query = `SELECT * FROM Addresses WHERE id = ${id}`

			db.get(query, function(err, rows){
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

			let query = `INSERT INTO Addresses (street, city, zipcode, contact_id) VALUES (
				'${param.street}',
				'${param.city}',
				'${param.zipcode}',
				${param.contactName}
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

	static update(param, id){

		let promise = new Promise(function(resolve, reject){

			let query = `UPDATE Addresses SET street = '${param.street}', city = '${param.city}', zipcode = '${param.zipcode}', contact_id = ${param.contactName} WHERE id = ${id}`

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

	static delete(id){

		let promise = new Promise(function(resolve, reject){

			let query = `DELETE FROM Addresses WHERE id = ${id}`

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

module.exports = Address