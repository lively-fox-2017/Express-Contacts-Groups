// sqlite3
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');

class Group {
	constructor(id, name_of_group){
		this.id = id
		this.name_of_group = name_of_group
	}

	static getAllGroups() {
		return new Promise((resolve, reject) => {
			db.all('SELECT * FROM groups', function(err, rows){
			let groups = [];
			rows.forEach((row) => {
				let group = new Group(row.id, row.name_of_group);
				groups.push(group);	
			})
				resolve(groups);
  			});
		});
	}

	static getByIDGroup(reqParams) {
		return new Promise((resolve, reject) => {
			db.get(`SELECT * FROM groups WHERE id = ${reqParams}`, function(err, rows){
			let group = new Group(rows.id, rows.name_of_group);
			resolve(group);
			});
		});
	}

	static insertGroup(name_of_group){
		return new Promise((resolve, reject) => {
			db.run(`INSERT INTO groups (name_of_group) VALUES ('${name_of_group}')`, function(err, rows){
			resolve(rows);
			});
		});
	}

	static updateGroup(name_of_group, reqParams){
		return new Promise((resolve, reject) => {
			db.run(`UPDATE groups SET name_of_group = '${name_of_group}' WHERE id = ${reqParams}`, function(err, rows){
			resolve(rows);
			});
		});
	}

	static deleteGroup(reqParams) {
		return new Promise((resolve, reject) => {
			db.run(`DELETE FROM groups WHERE id = ${reqParams}`, function(err, rows){
			resolve(rows);
			});
		});
	}
}

module.exports = Group;