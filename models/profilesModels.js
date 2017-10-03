var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('data.db');

class Profiles{

	constructor(id, username, password, name){
		this.id = id
		this.username = username
		this.password = password
		this.name = name
	}

	static getAllProfile(cbselect){

		let resultContacts = []
		let resultProfile = []
		let objProfile = {}

		db.all('select p.id, p.username, p.password, c.name from Profile p left join Contacts c on p.id_contact = c.id;', (err, profiles) => {
      	if(!err){
      		profiles.forEach((profil) =>{
      			objProfile = new Profiles(profil.id, profil.username, profil.password, profil.name)
      			resultProfile.push(objProfile)
      		})
      		
        	db.all('select id, name from Contacts;', (err, contacts) => {
          	if(!err){
          		cbselect(resultProfile, contacts, err)
          }
        })
      }
    })
	}

	static insertProfile(username, password, id_contact, cbinsert){

		db.run('insert into Profile (username, password, id_contact) values (?, ?, ?);', username, password, id_contact, err => {
        		cbinsert(err)
  		})
	}

	static deleteProfile(id, cbdelete){
		db.run('delete from Profile where id = (?)', id, err =>{
			cbdelete(err)
		})
	}

	static getProfile(id, cbget){
		db.all('select * from Profile where id = (?);', id, (err, profiles) => {
        	cbget(err, profiles)
    	})
	}

	static updateProfile(username, password, id, cbupdate){
		db.run('update Profile set username = (?), password = (?) where id = (?);', username, password, id, err =>{
			cbupdate(err)
		})
	}
}

module.exports = Profiles