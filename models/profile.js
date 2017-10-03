const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');
const Contact = require('./contact')
class Profile{
	constructor(){

	}
	static findAll(cb){
		let query = `SELECT * FROM Profiles`
		db.all(query, function (err, data) {
	    	if (!err) {
	    		if(data.length != 0){
		    		let res = []
		    		data.forEach((profile,i) => {
		    			Contact.findById(profile.id_contact, contact => {
		    				profile['name'] = contact.name
		    				res.push(profile)
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
	  	let query = `SELECT * FROM Profiles WHERE id = '${id}'`
		db.each(query, (err, row) => {
			if(!err){
				Contact.findById(row.id_contact, row_contact => {
					row['name'] = row_contact.name
					Contact.findAll(rows_contact => {
						let callback = {profile:row, contact:rows_contact}
						cb(callback)
					})					
				})
			}
		})
	}
	static findOne(params,cb){
		let query = `SELECT * FROM Profiles WHERE ${params.column} = '${params.find}'` 
		db.all(query, function(err,rows){
	    	if(!err){
	    		cb(rows)
	    	}
	  	});
	}
	static add(data,cb){
		let col = []
		let val = []
		for(let i in data){
			col.push(i)
			val.push(data[i])
		}
		let query = `INSERT INTO Profiles (${col.join(',')}) VALUES ('${val.join("','")}')`
		db.run(query, (err,row)=>{
			if(!err){
				cb(true)
			}
			else {
				if(err.code == 'SQLITE_CONSTRAINT'){
					Profile.findAll(rows_profile => {
						Contact.findAll(rows_contact => {
							let message = '<p style="color:red">ID Contact sudah digunakan!</p>'
							let callback = {profile:rows_profile,contact:rows_contact,msg:message}
							cb(callback)
						})
					})
				}
			}
		})
	}
	static edit(id,data){
		let params = []
		for(let i in data){
			params.push(i+'='+'"'+data[i]+'"')
		}
		let query = `UPDATE Profiles SET ${params} WHERE id = ${id}`
		db.run(query)
	}
	static del(id,cb){
		let query = `DELETE FROM Profiles WHERE id = ${id}`
		db.run(query)
	}
}

module.exports = Profile