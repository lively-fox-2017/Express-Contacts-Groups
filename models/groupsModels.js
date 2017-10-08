var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('data.db');
const Konjungsi = require('../models/konjungsiModels')
const Contacts = require('../models/contactsModel')

class Groups {
	constructor(id, name_of_group, name){
		this.id = id
		this.name_of_group = name_of_group
		this.name = name
	}

	static getAllGroup() {
		return new Promise((resolve, reject) => {
			
		let allGroup = this.getGroups()
		let allKonjungsi = Konjungsi.getAllKonjungsi()
		let allContact = new Promise((resolve, reject) => {
			db.all('select * from Contacts;', (err, contacts) =>{
				resolve(contacts)
			})
		});
		

		Promise.all([allGroup, allKonjungsi, allContact]).then(values =>{
			values[0].forEach((val) =>{
				val.id_contact = []
				values[1].forEach((val1) =>{
					if(val1.id_group === val.id){
						val.id_contact.push(val1.id_contact)
					}
				})
			})

			values[0].forEach((val) =>{
				val.name = []
				 val.id_contact.forEach((val1) =>{
					values[2].forEach((val2) =>{
						if(val1===val2.id){
							val.name.push(val2.name)
						}
					})
				})
			})
			let tempValues = values[0]
			resolve(tempValues)
		})
	})
}

	// static getAllGroup(cbselect){
	// 	let resultGroups = []
	// 	let objGroups = {}

	// 	db.all('select g.id, g.name_of_group, c.name from Groups g left join konjungsi on g.id = konjungsi.id_group left join Contacts c on konjungsi.id_contact = c.id;', function (err, groups) {
 //        if(!err){
 //        	groups.forEach((grup) =>{
 //        		objGroups = new Groups(grup.id, grup.name_of_group, grup.name)
 //        		resultGroups.push(objGroups)
 //        	})
 //        cbselect(err, resultGroups)
 //        }
 //  	  })
	// }

	static getGroups(){
		return new Promise((resolve, reject) => {
			db.all('select * from Groups;', (err, groups) =>{
				resolve(groups)
			})
		});
	}

	static insertGroup(name, cbinsert){

		return new Promise((resolve, reject) => {
			db.all('insert into Groups (name_of_group) values (?);', name, err =>{
				if(err){
					reject(err)
				}
			})
		});
	}

	static deleteGroup(id){

		return new Promise((resolve, reject) => {
			db.run('delete from Groups where id = (?)', id, err =>{
				if(err){
					reject(err)
				}
			})
		});
	}

	static getGroupById(id){

		return new Promise((resolve, reject) => {
			db.get('select * from Groups where id = (?);', id, (err, group) => {
  				resolve(group)
  			}) 
		});	
	}

	static updateGroup(name_of_group, id){

		return new Promise((resolve, reject) => {
			db.run('update Groups set name_of_group = (?) where id = (?);', name_of_group, id, err =>{
				if(err){
					reject(err)
				}
			})
		});

		
	}

	// static getAllGroupById(id_group){
	// 	return new Promise((resolve, reject) => {
	// 		db.all('select name_of_group from Groups where id = (?)', id_group, (err, resultNameGroup) =>{
	// 			resolve(resultNameGroup)
	// 		})
	// 	});
	// }
}

module.exports = Groups