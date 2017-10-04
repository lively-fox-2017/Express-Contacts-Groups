const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/data.db')
const Contact = require('./contacts')

class Group {

	constructor(data){
		this.id = data['id']
		this.name_of_group = data['name_of_group']
	}

	getContact(cb){

		Contact.findById(this.contact_id)
		.then(function(contact){
			console.log(contact)
			// cb(contact[0])
		})

	}

	static findAll(){

		let promise = new Promise(function(resolve, reject){

			let query = `SELECT * FROM Groups`

			db.all(query, function(err, rows){
				let groups = rows.map(function(row){
					return new Group(row)
				})


				groups.forEach(function(group){
					group.getContact(function(contact){
						group.contact_name = contact.name

						if(!err){
							resolve(groups)
						}else{
							reject(err)
						}

					})
				})

				// if(!err){
				// 	resolve(groups)
				// }else{
				// 	reject(err)
				// }

			})
		})

		return promise

	}

	static findGroupContact(){

		let promise = new Promise(function(resolve, reject){

			let query = `SELECT * FROM GroupsContacts`

			db.all(query, function(err, rows){
				// console.log(rows)
				// if(!err){
				// 	resolve(rows)
				// }else{
				// 	reject(err)
				// }
				let GC = rows.map(function(row){
					row.getContact()
				})
			})

		})

		return promise

	}

	static findById(id){

		let promise = new Promise(function(resolve, reject){

			let query = `SELECT * FROM Groups WHERE id = ${id}`

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

			let query = `INSERT INTO Groups (name_of_group) VALUES (
					'${param.nog}'
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

			let query = `UPDATE Groups SET name_of_group = '${param.nog}' WHERE id = ${id}`

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

	static addContact(param, id){

		let promise = new Promise(function(resolve, reject){

			let query = `INSERT INTO GroupsContacts (contact_id, group_id) VALUES (
				${param.contactName},
				${id}
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

	static delete(id){

		let promise = new Promise(function(resolve, reject){

			let query = `DELETE FROM Groups WHERE id = ${id}`

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

module.exports = Group