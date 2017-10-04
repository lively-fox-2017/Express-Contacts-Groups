"use strict"

const Contacts = require('./../models/contacts');
const Groups = require('./../models/groups');
const ContactsGroups = require('./../models/contacts_groups');
const Addresses = require('./../models/addresses');

class ContactsCtrl {

	static serveContacts(req, res) {
		const findGroupsByContactId = contactId => {
			return new Promise((resolve, reject) => {
				ContactsGroups.findByColumnValue('contactId', contactId)
				.then(contactsGroups => {
					return new Promise((resolve, reject) => {
						const readGroups = contactsGroups.map(contactsGroup => {
							return new Promise((resolve, reject) => {
								const groupId = contactsGroup.groupId;
								resolve(Groups.readRecord(groupId));
							});
						});

						Promise.all(readGroups)
						.then(groups => {
							resolve(groups);
						})
						.catch(err => {
							if (err) throw err;
						})
					});
				})
				.then(groups => {
					resolve(groups);
				})
				.catch(err => {
					if (err) throw err;
				});
			});
		}

		const readContacts = () => {
			return new Promise((resolve, reject) => {
				Contacts.readAllRecords()
				.then(contacts => {
					return new Promise((resolve, reject) => {
						contacts = contacts.map(contact => {
							return new Promise((resolve, reject) => {
								findGroupsByContactId(contact.id)
								.then(groups => {
									contact['groups'] = groups;
									resolve(contact);
								});
							});
						});

						Promise.all(contacts)
						.then(contacts => {
							resolve(contacts);
						});
					});
				})
				.then(contacts => {
					resolve(contacts);
				})
				.catch(err => {
					if (err) throw err;
				});
			});
		}

		Promise.all([readContacts(), Groups.readAllRecords()])
		.then(values => {
			let data = {
				contacts: values[0],
				groups: values[1]
			}
			res.render('contacts', {data});
		})
		.catch(err => {
			if (err) throw err;
		});
	}

	static createContact(req, res) {
		const values = [req.body.name, req.body.company, req.body.telp_number, req.body.email].map(val => '\'' + val + '\'');

		Contacts.createRecord(values)
		.then(obj => {
			if (req.body.groupId) {
				ContactsGroups.createRecord([obj.lastID, req.body.groupId])
				.then(() => {
					res.redirect('/contacts');
				})
				.catch(err => {
					if (err) throw err;
				});
			} else {
				res.redirect('/contacts');
			}
			
		})
		.catch(err => {
			if (err) throw err;
		});
	}

	static editContact(req, res) {
		Contacts.readRecord(req.params.id)
		.then(contact => {
			let datum = contact;
			res.render('contact-edit', {datum});
		});
	}

	static updateContact(req, res) {
		const values = [req.body.name, req.body.company, req.body.telp_number, req.body.email].map(val => '\'' + val + '\'');
		Contacts.updateRecord(req.params.id, values)
		.then(() => {
			res.redirect('/contacts');
		})
		.catch(err => {
			if (err) throw err;
		});
	}

	static deleteContact(req, res) {
		Contacts.deleteRecord(req.params.id)
		.then(() => {
			res.redirect('/contacts');
		})
		.catch(err => {
			if (err) throw err;
		});
	}

	static showAddress(req, res) {
		Promise.all([Contacts.readRecord(req.params.id), Addresses.findByColumnValue('contactId', req.params.id)])
		.then(values => {
			let data = {contact: values[0], addresses: values[1]};
			res.render('contact-addresses', {data});
		})
		.catch(err => {
			if (err) throw err;
		})
	}

	static addAddress(req, res) {
		const values = [req.body.street, req.body.city, req.body.zipcode, req.params.id].map(val => '\'' + val + '\'');
		Addresses.createRecord(values)
		.then(() => {
			res.redirect('/contacts/' + req.params.id + '/address');
		})
		.catch(err => {
			if (err) throw err;
		});
	}
}

module.exports = ContactsCtrl;