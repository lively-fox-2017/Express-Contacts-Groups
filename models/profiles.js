// sqlite3
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');

class Profile {
	constructor(id, username, password, id_contacts) {
		this.id = id
		this.username = username
		this.password = password
		this.id_contacts = id_contacts
	}

	static getAllProfiles(callback) {
		db.all('SELECT * FROM profiles', function(err, rows){
			let profiles = [];
			rows.forEach((row) => {
				let profile = new Profile(row.id, row.username, row.password, row.id_contacts);
				profiles.push(profile);	
			});
				callback(profiles);
  		});
	}

	static getByIDProfile(reqParams, callback) {
		db.get(`SELECT * FROM profiles WHERE id = ${reqParams}`, function(err, rows){
			let profile = new Profile(rows.id, rows.name, rows.company, rows.telp_number, rows.email);
			callback(profile);
		});
	}

	static insertProfile(username, password, id_contacts, callback){
		db.run(`INSERT INTO profiles (username, password, id_contacts) VALUES ('${username}', '${password}', '${id_contacts}')`, function(err, rows){
			callback(err);
		});
	}

	static updateProfile(username, password, reqParams, callback){
		db.run(`UPDATE profiles SET username = '${username}', password = '${password}' WHERE id = ${reqParams}`, function(err, rows){
			callback();
		});
	}

	static deleteProfile(reqParams, callback) {
		db.run(`DELETE FROM profiles WHERE id = ${reqParams}`, function(err, rows){
			callback();
		});
	}
}

module.exports = Profile;