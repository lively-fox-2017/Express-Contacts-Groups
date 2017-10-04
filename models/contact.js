const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');
const ContactGroup = require('./contactGroup')

class Contact{
	static findAll(){
		const promise = new Promise((resolve,reject) => {
			let query = `SELECT * FROM Contacts`
			db.all(query, function (err, data) {
				if(!err){
					resolve(data)
				} else {
					reject(data)
				}
		  	});			
		})
		return promise
	}
	static findById(id){
		const promise = new Promise((resolve,reject) => {
			let query = `SELECT * FROM Contacts WHERE id = '${id}'` 
			db.each(query, (err, row) => {
				if(!err){
					resolve(row)
				} else {
					reject(err)
				}
			})
		})
		return promise
	}
	static findOne(params){
		const promise = new Promise((resolve,reject) => {
			let query = `SELECT * FROM Contacts WHERE ${params.column} = '${params.find}'` 
			db.all(query, function(err,rows){
		    	if(!err){
		    		resolve(rows)
		    	} else {
		    		reject(err)
		    	}
		  	});
		})
		return promise
	}
	static add(data){
		const promise = new Promise((resolve,reject) => {
			let col = []
			let val = []
			for(let i in data){
				col.push(i)
				val.push(data[i])
			}
			let query = `INSERT INTO Contacts (${col.join(',')}) VALUES ('${val.join("','")}')`
			db.run(query, function(err,row){
				if(!err){
					resolve(this.lastID)					
				} else {
					reject(err)
				}
			})
		})
		return promise
	}
	static edit(id,data){
		const promise = new Promise((resolve,reject) => {
			let params = []
			for(let i in data){
				params.push(i+'='+'"'+data[i]+'"')
			}
			let query = `UPDATE Contacts SET ${params} WHERE id = ${id}`
			db.run(query, function(err){
				if(!err) {
					resolve('Success updated!')
				} else {
					reject(err)
				}
			})
		})
		return promise
	}
	static del(id){
		const promise = new Promise((resolve,reject) => {
			let query = `DELETE FROM Contacts WHERE id = ${id}`
			db.run(query, function(err,data){
				if(!err){
					resolve('Success deleted ID : '+this.lastID)
				} else {
					reject(err)
				}
			})
		})
		return promise
	}
}

module.exports = Contact