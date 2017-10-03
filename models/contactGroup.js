const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');
class ContactGroup{
	constructor(){

	}
	static findAll(cb){
		let query = `SELECT * FROM ContactGroups`
		db.all(query, (err,rows) => {
			if(!err){
				cb(rows)
			}
		})
	}
	static add(data){
		let col = []
		let val = []
		for(let i in data){
			col.push(i)
			val.push(data[i])
		}
		let query = `INSERT INTO ContactGroups (${col.join(',')}) VALUES ('${val.join("','")}')`
		db.run(query)
	}
	
}
module.exports = ContactGroup