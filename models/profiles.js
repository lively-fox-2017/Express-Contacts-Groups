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

	static getAllProfiles() {
		return new Promise((resolve, reject) => {
			db.all('SELECT * FROM profiles', function(err, rows){
			let profiles = [];
			rows.forEach((row) => {
				let profile = new Profile(row.id, row.username, row.password, row.id_contacts);
				profiles.push(profile);	
			});
				resolve(profiles);
  			});
		});
	}

	static getByIDProfile(reqParams) {
		return new Promise((resolve, reject) => {
			db.get(`SELECT * FROM profiles WHERE id = ${reqParams}`, function(err, rows){
			let profile = new Profile(rows.id, rows.name, rows.company, rows.telp_number, rows.email);
			resolve(profile);
			});
		});
	}

	static insertProfile(username, password, id_contacts){
		return new Promise((resolve, reject) => {
			db.run(`INSERT INTO profiles (username, password, id_contacts) VALUES ('${username}', '${password}', '${id_contacts}')`, function(err, rows){
			if (err) {
				reject(err);
			}
			resolve(rows);
			});
		});
	}

	static updateProfile(username, password, reqParams){
		return new Promise((resolve, reject) => {
			db.run(`UPDATE profiles SET username = '${username}', password = '${password}' WHERE id = ${reqParams}`, function(err, rows){
			resolve(rows);
			});
		});
	}

	static deleteProfile(reqParams) {
		return new Promise((resolve, reject) => {
			db.run(`DELETE FROM profiles WHERE id = ${reqParams}`, function(err, rows){
			resolve(rows);
			});
		});
	}
}

module.exports = Profile;