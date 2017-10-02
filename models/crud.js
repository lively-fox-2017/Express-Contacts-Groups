"use strict"

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/data.db');


class Crud {
	constructor(table, columns) {
		this._table = table;		// string
		this._columns = columns; 	// array of column's names (string);
	}

	createRecord(columnValues) {	//in: array
		return new Promise((resolve, reject) => {
			columnValues = columnValues.map(cv => '\'' + cv + '\'').join(', ');
			let colStatement = this._columns.join(', ')
			let query = `INSERT INTO ${this._table} (${colStatement}) VALUES (${columnValues})`;

			db.run(query, err => {
				if (err) reject(err);
				resolve();
			})
		});
	}

	readRecords() {
		return new Promise((resolve, reject) => {
			let query = `SELECT * FROM ${this._table}`;
			db.all(query, (err, records) => {
				if (err) reject(err);
				resolve(records);
			});
		});
	}

	readRecord(id) {	// in: string
		return new Promise((resolve, reject) => {
			let query = `SELECT * FROM ${this._table} WHERE id = ${id}`;
			db.get(query, (err, record) => {
				if (err) reject(err);
				resolve(record);
			});
		});
	}

	updateRecord(columnValues, id) {	// in: array, string
		console.log('UPDATE!');
		return new Promise((resolve, reject) => {
			let colStatement = [];
			this._columns.forEach((col, idx) => colStatement.push(`${col} = '${columnValues[idx]}'`));
			let query = `UPDATE ${this._table} SET ${colStatement.join(', ')} WHERE id = ${id}`;

			db.run(query, err => {
				if (err) reject(err);
				resolve();
			});
		});
	}

	deleteRecord(id) {	// in: string
		return new Promise((resolve, reject) => {
			let query = `DELETE FROM ${this._table} WHERE id = ${id}`;

			db.run(query, err => {
				if (err) reject(err);
				resolve();
			});
		});	
	}
}

module.exports = Crud;