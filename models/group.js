const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');
const ContactGroup = require('./contactGroup')
const Contact = require('./contact')
class Group{
	static findAll(){
		const promise = new Promise((resolve,reject) => {
			let query = `SELECT * FROM Groups`
			db.all(query, function (err, data) {
		    	if (!err) {
		    		let arrProm = []
		    		ContactGroup.findAll().then(conjunctions => {
						conjunctions.forEach((conjunction,i) => {
							arrProm.push(Contact.findById(conjunction.id_contact))
						})
						Promise.all(arrProm).then(contacts => {
							contacts.forEach((contact,i) => {
								conjunctions[i]['name'] = contact.name
							})
							let arr_group = []
			    			let groups = data.map(group => {
								group["member"] = []
				    			let new_conj = conjunctions.map(conj => {
				    				if(group.id == conj.id_group){
				    					return group.member.push(conj.name)
				    				}
			    				})
			    				arr_group.push(group)
			    			})
			    			resolve(arr_group)
						})
		    		})
		    	}
		  	});
		})
		return promise
	}
	static findById(id){
		const promise = new Promise((resolve,reject) => {
			let query = `SELECT * FROM Groups where id='${id}'`
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
	static findWhere(params){
		const promise = new Promise((resolve,reject) => {
			let query = `SELECT * FROM Groups WHERE ${params.column} = '${params.find}'` 
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
			let query = `INSERT INTO Groups (${col.join(',')}) VALUES ('${val.join("','")}')`
			db.run(query, (err,msg) => {
				if(!err) {
					resolve('Success add group!')
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
				params.push(i+"="+"'"+data[i]+"'")
			}
			let query = `UPDATE Groups SET ${params} WHERE id = ${id}`
			db.run(query, (err,msg) => {
				if(!err) {
					resolve('Success update group!')
				} else {
					reject(err)
				}
			})	
		})
		return promise
	}
	static del(id){
		const promise = new Promise((resolve,reject) => {
			let query = `DELETE FROM Groups WHERE id = ${id}`
			db.run(query, (err,msg) => {
				if(!err) {
					resolve('Success delete group!')
				} else {
					reject(err)
				}
			})
		})
		return promise
	}
}

module.exports = Group