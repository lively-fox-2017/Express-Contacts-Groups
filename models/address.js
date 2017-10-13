const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');
const Contact = require('./contact')
class Address{
	static findAll(){
		const promise = new Promise((resolve,reject) => {
			let query = `SELECT * FROM Address`
			db.all(query, function (err, data) {
		    	if (!err) {
				   	let arr_prom = []
			    	data.forEach((address,i) => {
				   		arr_prom.push(Contact.findById(address.id_contact))	   			
			    	})
			    	Promise.all(arr_prom).then(contacts => {
			    		contacts.forEach((contact,i) => {
							data[i]['name'] = contact.name
			    		})
			    		resolve(data)
				   	}).catch(err => {console.log(err)})
		    	} else {
		    		reject(err)
		    	}
		  	});
		})
		return promise
	}
	static findById(id){
		const promise = new Promise((resolve,reject) => {
			let query = `SELECT * FROM Address WHERE id = '${id}'` 
			db.each(query, (err, row) => {
				if(!err){
					Contact.findById(row.id_contact).then(rs => {
						row['name'] = rs.name
						resolve(row)
					}).catch(err => {console.log(err)})
				} else {
					reject(err)
				}
			})
		})
		return promise
	}
	static findWhere(params){
		const promise = new Promise((resolve,reject) => {
			let query = `SELECT * FROM Address WHERE ${params.column} = '${params.find}'` 
			db.all(query, function(err,rows){
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
			let query = `INSERT INTO Address (${col.join(',')}) VALUES ('${val.join("','")}')`
			db.run(query, (err) => {
				if(!err) {
					resolve('Success add data!')
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
			let query = `UPDATE Address SET ${params} WHERE id = ${id}`
			db.run(query, (err) => {
				if(!err) {
					resolve('Success edited!')
				} else {
					reject(err)
				}
			})
		})
		return promise
	}
	static del(id){
		const promise = new Promise((resolve,reject) => {
			let query = `DELETE FROM Address WHERE id = ${id}`
			db.run(query, (err) => {
				if(!err) {
					resolve('Success deleted!')
				} else {
					reject(err)
				}
			})
		})
	}
}

module.exports = Address