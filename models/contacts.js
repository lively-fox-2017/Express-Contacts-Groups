"use strict"

const Crud = require('./crud');

class Contacts extends Crud {
	constructor() {
		super('contacts', ['name', 'company', 'telp_number', 'email']);
	}	
}

module.exports = Contacts;