var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('data.db');
const Konjungsi = require('../models/konjungsiModels')
const Groups = require('../models/groupsModels')

class Contacts{
	constructor(){

	}

	static getAllContact(){

		return new Promise((resolve, reject) => {

			let allContact = this.getContacts()
			let allGroup = Groups.getGroups()
			let allKonjungsi = Konjungsi.getAllKonjungsi()

			Promise.all([allContact, allKonjungsi, allGroup]).then((values) =>{

				values[0].forEach((val) =>{
					val.id_group = []
					values[1].forEach((val1) =>{
						if(val1.id_contact === val.id){
							val.id_group.push(val1.id_group)
						}
					})
				})

				values[0].forEach((val) =>{
					val.name_of_group = []
				 	val.id_group.forEach((val1) =>{
						values[2].forEach((val2) =>{
							if(val1===val2.id){
								val.name_of_group.push(val2.name_of_group)
							}
						})
					})
				})

				let tempValues = values[0]
				let tempValues2 = values[2]
				let result = {tempValues, tempValues2}

				resolve(result)
			})
		});
	}

	static getContacts(){

		return new Promise((resolve, reject) => {
			db.all('select * from Contacts;', (err, contacts) =>{
				resolve(contacts)
			})
		});
	}

	static deleteContact(id_contact){

		return new Promise((resolve, reject) => {
			db.run('delete from Contacts where id = (?);', id_contact, err =>{
				if(err){
					reject(err)
				}
			})
		});	
	}

	static insertContact(name, company, telp, email, name_of_group, cbinsert){

		return new Promise((resolve, reject) => {
			db.run('insert into Contacts (name, company, telp_number, email) values (?, ?, ?, ?);', name, company, telp, email, (err) =>{
        	if(!err){
          		db.get('select id from Contacts order by id desc limit 1;', (err, contact) => {
            		db.run('insert into konjungsi (id_contact, id_group) values (?, ?);', contact.id, name_of_group, err =>{
            			if(err){
            				reject(err)
            			}
            		})
          		})
        	}
     		})
		});	
	}

	static getContactById(id){

		return new Promise((resolve, reject) => {
			db.get(`select * from Contacts where id = ${id}`, (err, contact) => {
      			resolve(contact)
    		})
		});	
	}

	static updateContact(name, company, telp_number, email, id){

		return new Promise((resolve, reject) => {
			db.run('update Contacts set name = (?), company = (?), telp_number = (?), email = (?) where id = (?);', name, company, telp_number, email, id, (err, contact) =>{
				if(err){
					reject(err)
				}
			})
		})
	}
}

module.exports = Contacts