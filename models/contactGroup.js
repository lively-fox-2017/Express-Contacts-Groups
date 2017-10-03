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
}
module.exports = ContactGroup