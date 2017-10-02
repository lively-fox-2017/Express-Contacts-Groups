"use strict"

const Crud = require('./crud');

class Groups extends Crud {
	constructor() {
		super('groups', ['name_of_group']);
	}	
}

module.exports = Groups;