const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');


class Contact{
	constructor(){

	}
	static findAll(cb){
		let query = `SELECT * FROM Contacts`
		db.all(query, function (err, data) {
			cb(data)
	  	});
	}
	static findById(id,cb){
		let query = `SELECT * FROM Contacts WHERE id = '${id}'` 
		db.each(query, (err, row) => {
			if(!err){
				cb(row)
			}
		})
	}
	static findOne(params,cb){
		let query = `SELECT * FROM Contacts WHERE ${params.column} = '${params.find}'` 
		db.all(query, function(err,rows){
	    	if(!err){
	    		cb(rows)
	    	}
	  	});
	}
	static add(data,groupID){
		let col = []
		let val = []
		for(let i in data){
			col.push(i)
			val.push(data[i])
		}
		let query = `INSERT INTO Contacts (${col.join(',')}) VALUES ('${val.join("','")}')`
		db.run(query, function(err,row){
			if(groupID !== ''){
				let id_contact = this.lastID
				db.run(`INSERT INTO ContactGroups (id_contact, id_group) VALUES ('${id_contact}','${groupID}')`)
			}
		})
	}
	static edit(id,data,cb){
		let params = []
		for(let i in data){
			params.push(i+'='+'"'+data[i]+'"')
		}
		let query = `UPDATE Contacts SET ${params} WHERE id = ${id}`
		db.run(query)
	}
	static del(id,cb){
		let query = `DELETE FROM Contacts WHERE id = ${id}`
		db.run(query)
	}
}

module.exports = Contact