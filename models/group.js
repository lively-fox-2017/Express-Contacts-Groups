const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');
const ContactGroup = require('./contactGroup')
const Contact = require('./contact')
class Group{
	constructor(){

	}
	static findAll(cb){
		let query = `SELECT * FROM Groups`
		db.all(query, function (err, data) {
	    	if (!err) {
	    		let arrGroups = []
	    		ContactGroup.findAll(rows => {
	    			rows.forEach((conjunction,i) => {
		    			Contact.findById(conjunction.id_contact, contact => {
		    				conjunction['name'] = contact.name
		    				arrGroups.push(conjunction)
		    				if(i >= rows.length-1){
			    				let newData = data.map(i => {
									i["member"] = []	
				    				let newData_con = arrGroups.map(j => {
				    					if(i.id == j.id_group){
				    						return i.member.push(j.name)
				    					}
			    					})
			    					return i
			    				})
			    				cb(newData)
		    				}
		    			})
	    			})
	    		})
	    	}
	  	});
	}
	static findById(id,cb){
		let query = `SELECT * FROM Groups WHERE id = '${id}'` 
		db.each(query, (err, row) => {
			if(!err){
				cb(row)
			}
		})
	}
	static findOne(params,cb){
		let query = `SELECT * FROM Groups WHERE ${params.column} = '${params.find}'` 
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
		let query = `INSERT INTO Groups (${col.join(',')}) VALUES ('${val.join("','")}')`
		db.run(query)
	}
	static edit(id,data){
		let params = []
		for(let i in data){
			params.push(i+"="+"'"+data[i]+"'")
		}
		let query = `UPDATE Groups SET ${params} WHERE id = ${id}`
		db.run(query)	
	}
	static del(id){
		let query = `DELETE FROM Groups WHERE id = ${id}`
		db.run(query)
	}
}

module.exports = Group