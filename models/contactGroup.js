const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');
class ContactGroup{
	static findAll(){
		const promise = new Promise((resolve,reject) => {
			let query = `SELECT * FROM ContactGroups`
			db.all(query, (err,rows) => {
				if(!err){
					resolve(rows)
				} else {
					reject(err)
				}
			})			
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
			let query = `INSERT INTO ContactGroups (${col.join(',')}) VALUES ('${val.join("','")}')`
			db.run(query, function(err,data){
				if(!err) {
					resolve('Add data sucsess!')
				} else {
					reject(err)
				}
			})			
		})
		return promise
	}	
}
module.exports = ContactGroup