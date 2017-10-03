const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');
const Contact = require('./contact')
class Address{
	constructor(){

	}
	static findAll(cb){
		let query = `SELECT * FROM Address`
		db.all(query, function (err, data) {
	    	if (!err) {
	       		if(data.length != 0){
			   		let res = []
		    		data.forEach((address,i) => {
			   			Contact.findById(address.id_contact, contact => {
			   				address['name'] = contact.name
			   				res.push(address)
				    		if(i >= data.length-1){
					    		cb(res)
				    		}
			   			})
		    		})
		    	}else{
		    		cb(data)
		    	}
	    	}
	  	});
	}
	static findById(id,cb){
		let query = `SELECT * Address WHERE id = '${id}'` 
		db.each(query, (err, row) => {
			if(!err){
				Contact.findById(row.id, contact => {
					row['name'] = contact.name
					cb(row)
				})
			}
		})
	}
	static findWhere(params,cb){
		let query = `SELECT * FROM Address WHERE ${params.column} = '${params.find}'` 
		db.all(query, function(err,rows){
	    	if(!err){
	    		cb(rows)
	    	}
	  	});
	}
	static add(data){
		let col = []
		let val = []
		for(let i in data){
			col.push(i)
			val.push(data[i])
		}
		let query = `INSERT INTO Address (${col.join(',')}) VALUES ('${val.join("','")}')`
		db.run(query)
	}
	static edit(id,data,cb){
		let params = []
		for(let i in data){
			params.push(i+'='+'"'+data[i]+'"')
		}
		let query = `UPDATE Address SET ${params} WHERE id = ${id}`
		db.run(query)
	}
	static del(id,cb){
		let query = `DELETE FROM Address WHERE id = ${id}`
		db.run(query)
	}
}

module.exports = Address