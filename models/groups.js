// sqlite3
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');

class Group {
	constructor(id, name_of_group){
		this.id = id
		this.name_of_group = name_of_group
	}

	static getAllGroups(callback) {
		db.all('SELECT * FROM groups', function(err, rows){
			let groups = [];
			rows.forEach((row) => {
				let group = new Group(row.id, row.name_of_group);
				groups.push(group);	
			})
				callback(groups);
  		});
	}

	static getByIDGroup(reqParams, callback) {
		db.get(`SELECT * FROM groups WHERE id = ${reqParams}`, function(err, rows){
			let group = new Group(rows.id, rows.name_of_group);
			callback(group);
		});
	}

	static insertGroup(name_of_group, callback){
		db.run(`INSERT INTO groups (name_of_group) VALUES ('${name_of_group}')`, function(err, rows){
			callback();
		});
	}

	static updateGroup(name_of_group, reqParams, callback){
		db.run(`UPDATE groups SET name_of_group = '${name_of_group}' WHERE id = ${reqParams}`, function(err, rows){
			console.log(rows)
			callback();
		});
	}

	static deleteGroup(reqParams, callback) {
		db.run(`DELETE FROM groups WHERE id = ${reqParams}`, function(err, rows){
			callback();
		});
	}
}

module.exports = Group;