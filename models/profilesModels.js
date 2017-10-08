var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('data.db');
const Contact = new require('../models/contactsModel')

class Profiles{

	constructor(id, username, password, id_contact){
		this.id = id
		this.username = username
		this.password = password
		this.id_contact = id_contact
		this.name = ''
	}

	static getAllProfile(){

		let resultContacts = []
		let resultProfile = []
		let objProfile = {}

		return new Promise((resolve, reject) => {
			db.all('select * from Profile;', (err, profiles) => {
			
			let tempContactname = ''
      	
      		if(!err){
      			profiles.forEach((profil) =>{
      				objProfile = new Profiles(profil.id, profil.username, profil.password, profil.id_contact)
      				resultProfile.push(objProfile)
      			})

      			resultProfile.forEach((results, index) =>{
      				results.name = ''
      				Contact.getContactById(results.id_contact).then((result) =>{
      					results.name = result.name
      					console.log(results);
      					// if(index>=resultProfile.length-1){
      					// 	resolve(resultProfile);
      					// }
      				})
      			})

      			//console.log(resultProfile);
      		
        		Contact.getContacts().then((contacts)=>{
					let result = {resultProfile, contacts}
        				resolve(result)
        		})
      		}
    		})	
		});

		
	}

	static insertProfile(username, password, id_contact){

		return new Promise((resolve, reject) => {
			db.run('insert into Profile (username, password, id_contact) values (?, ?, ?);', username, password, id_contact, err => {
        		resolve(err)
  			})
		});

		
	}

	static deleteProfile(id){

		return new Promise((resolve, reject) => {
			db.run('delete from Profile where id = (?)', id, err =>{
				if(err){
					reject(err)
				}
			})
		});
	}

	static getProfileById(id){

		return new Promise((resolve, reject) => {
			db.all('select * from Profile where id = (?);', id, (err, profiles) => {
        		if(err){
        			reject(err)
        		}else{
        			resolve(profiles)
        		}
    		})
		});		
	}

	static updateProfile(username, password, id){
		
		return new Promise((resolve, reject) => {
			db.run('update Profile set username = (?), password = (?) where id = (?);', username, password, id, err =>{
				if(err){
					reject(err)
				}
			})
		});
	}

	static getContact(id_contact) {
		return new Promise((resolve, reject) => {
			Contact.getContactById( id_contact, (resultContact) =>{
				console.log(resultContact)
          		resolve(resultContact.name)
        	})	
		});
	}
}

module.exports = Profiles