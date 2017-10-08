var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('data.db');
const Contacts = require('../models/contactsModel')

class Konjungsi {
	constructor(){

	}

	static getAllKonjungsi() {
		return new Promise((resolve, reject) => {
			db.all('select * from konjungsi;', (err, konjungsi) =>{
				resolve(konjungsi)
			})
		});
	}
}

module.exports = Konjungsi