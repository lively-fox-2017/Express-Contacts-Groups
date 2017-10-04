const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/data.db')
const Contact = require('./contacts')

class Profile {

	constructor(data){
		this.id = data['id']
		this.contact_id = data['contact_id']
		this.username = data['username']
		this.password = data['password']
	}

	getContact(cb){

		Contact.findById(this.contact_id)
		.then(function(contact){
			cb(contact[0])
		})

	}

	static findAll(){

		let promise = new Promise(function(resolve, reject){

			let query = `SELECT * FROM Profiles`

			db.all(query, function(err, rows){
				let profiles = rows.map(function(row){
					return new Profile(row)
				})

				let count = 0
				profiles.forEach(function(profile){
					profile.getContact(function(contact){
						profile.contact_name = contact.name

						count++

						if(count === profiles.length){
							resolve(profiles)
						}

					})
				})
			})

		})

		return promise

	}

	static findById(id){

		let promise = new Promise(function(resolve, reject){

			let query = `SELECT * FROM Profiles WHERE id = ${id}`

			db.all(query, function(err, rows){
				let profile = rows.map(function(row){
					return new Profile(row)
				})

				if(!err){
					resolve(profile)
				}else{
					reject(err)
				}

			})

		})

		return promise

	}

	static save(param){

		let promise = new Promise(function(resolve, reject){

			let query = `INSERT INTO Profiles (contact_id, username, password) VALUES (
				${param.contactName},
				'${param.user}',
				'${param.pass}'
			)`

			db.run(query, function(err, rows){
				if(!err){
					resolve()
				}else{
					err.code = `Sorry contact name already used!`
					reject(err.code)
				}

			})

		})

		return promise

	}

	static update(param, id){

		let promise = new Promise(function(resolve, reject){

			let query = `UPDATE Profiles SET contact_id = ${param.contactName}, username = '${param.user}', password = '${param.pass}' WHERE id = ${id}`

			db.run(query, function(err, rows){
				if(!err){
					let success = `ID ${id} Updated!`
					resolve(success)
				}else{
					err.code = `Sorry ID ${id} can't update, contact name already used!`
					reject(err.code)
				}

			})

		})

		return promise

	}

	static delete(id){

		let promise = new Promise(function(resolve, reject){

			let query = `DELETE FROM Profiles WHERE id = ${id}`

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

}

module.exports = Profile