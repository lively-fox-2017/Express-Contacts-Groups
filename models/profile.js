const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');
const Contact = require('./contact')
class Profile{
	static findAll(){
		const promise = new Promise((resolve,reject) => {
			let query = `SELECT * FROM Profiles`
			db.all(query, function (err, data) {
		    	if (!err) {
			    	let arr_prom = []
			    	data.forEach((profile,i) => {
			    		arr_prom.push(Contact.findById(profile.id_contact))
			    	})
			    	Promise.all(arr_prom).then(contacts => {
			    		contacts.forEach((contact,i) => {
			    			data[i]['name'] = contact.name
			    		})
			    		resolve(data)
			    	})
		    	} else {
		    		reject(err)
		    	}
		  	});
		})
		return promise
	}
	static findById(id){
		const promise = new Promise((resolve,reject) => {
		  	let query = `SELECT * FROM Profiles WHERE id = '${id}'`
			db.each(query, (err, row) => {
				if(!err){
					Contact.findById(row.id_contact).then(row_contact => {
						row['name'] = row_contact.name
						Contact.findAll().then(rows_contact => {
							let callback = {profile:row, contact:rows_contact}
							resolve(callback)
						})					
					}).catch(err => {
						console.log(err)
					})
				}
			})
		})
		return promise
	}
	static findWhere(params){
		const promise = new Promise((resolve,reject) => {
			let query = `SELECT * FROM Profiles WHERE ${params.column} = '${params.find}'` 
			db.all(query, (err,rows) => {
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
			let query = `INSERT INTO Profiles (${col.join(',')}) VALUES ('${val.join("','")}')`
			db.run(query, (err,row)=>{
				if(!err){
					resolve(true)
				}
				else {
					if(err.code == 'SQLITE_CONSTRAINT'){
						Promise.all([
							Profile.findAll(),
							Contact.findAll()
						]).then(resource => {
							let message = '<p style="color:red">ID Contact sudah digunakan!</p>'
							let callback = {profile:rows_profile,contact:rows_contact,msg:message}
							resolve(callback)
						}).catch(err => {
							reject(err)
						})
					}
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
			let query = `UPDATE Profiles SET ${params} WHERE id = ${id}`
			db.run(query, function(err) {
				if(!err) {
					resolve('Success update!')
				} else {
					reject(err)
				}
			})
		})
		return promise
	}
	static del(id) {
		const promise = new Promise((resolve,reject) => {
			let query = `DELETE FROM Profiles WHERE id = ${id}`
			db.run(query, (err,res) => {
				if(!err) {
					resolve(res)
				} else {
					reject(err)
				}
			})
		})
		return promise
	}
}

module.exports = Profile