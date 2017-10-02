"use strict"
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/data.db');

const Crud = require('./crud');

class ContactsGroups extends Crud {
	constructor() {
		super('contacts_groups', ['contactId', 'groupId']);
	}

	addGroupToContact(contactId, groupId) {
		// create record arr: contactId, groupId
	}

	addContactToGroup(contactId, groupId) {
		// create record arr: contactId, groupId
	}

	findGroupByContactId(contactId) {
		return new Promise((resolve, reject) => {
			let query = 'SELECT * FROM contacts_groups WHERE contactId = contactId';
		});
	}

	findContactByGroupId(groupId) {

	}
}

module.exports = ContactsGroups;