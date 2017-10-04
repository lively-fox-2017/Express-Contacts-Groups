"use strict"

const Groups = require('./../models/groups');
const Contacts = require('./../models/contacts');
const ContactsGroups = require('./../models/contacts_groups');

class GroupsCtrl {
	static serveGroups(req, res) {

		const findContactsByGroupId = groupId => {
			return new Promise((resolve, reject) => {
				ContactsGroups.findByColumnValue('groupId', groupId)
				.then(contactsGroups => {
					return new Promise((resolve, reject) => {
						const readContacts = contactsGroups.map(contactsGroup => {
							return new Promise((resolve, reject) => {
								const contactId = contactsGroup.contactId;
								resolve(Contacts.readRecord(contactId));
							});
						});

						Promise.all(readContacts)
						.then(contacts => {
							resolve(contacts);
						})
						.catch (err => {
							if (err) throw err;
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

		const readGroups = () => {
			return new Promise((resolve, reject) => {
				Groups.readAllRecords()
				.then(groups => {
					return new Promise((resolve, reject) => {
						const groupsWithContacts = groups.map(group => {
							return new Promise((resolve, reject) => {
								findContactsByGroupId(group.id)
								.then(contacts => {
									group['contacts'] = contacts;
									resolve(group);
								})
								.catch(err => {
									if (err) throw err;
								});
							});
						});

						Promise.all(groupsWithContacts)
						.then(groupsWithContacts => {
							resolve(groupsWithContacts);
						})
						.catch(err => {
							if (err) throw err;
						});
					});
				})
				.then(groups => {
					resolve(groups);
				})
				.catch(err => {
					if (err) throw err;
				});
			});
		};

		readGroups()
		.then(groups => {
			let data = {groups: groups};
			res.render('groups', {data});
		})
		.catch(err => {
			if (err) throw err;
		});
	}

	static createGroup(req, res) {
		const values = [req.body.name_of_group].map(val => '\'' + val + '\'');

		Groups.createRecord(values)
		.then(() => {
			res.redirect('/groups');
		})
		.catch(err => {
			if (err) throw err;
		})
	}

	static editGroup(req, res) {
		Groups.readRecord(req.params.id)
		.then(group => {
			let data = {group: group};
			res.render('group-edit', {data});
		})
		.catch(err => {
			if (err) throw err;
		});
	}

	static updateGroup(req, res) {
		const values = [req.body.name_of_group];
		Groups.updateRecord(req.params.id, values)
		.then(() => {
			res.redirect('/groups');
		})
		.catch(err => {
			if (err) throw err;
		});

	}

	static deleteGroup(req, res) {
		Groups.deleteRecord(req.params.id)
		.then(() => {
			res.redirect('/groups');
		})
		.catch(err => {
			if (err) throw err;
		});
	}

	static assignContact(req, res) {
		Promise.all([Groups.readRecord(req.params.id), Contacts.readAllRecords()])
		.then(values => {
			let data = {group: values[0], contacts: values[1]};
			res.render('group-assign-contact', {data});
		})
		.catch(err => {
			if (err) throw err;
		});
	}

	static updateContact(req, res) {
		const values = [req.body.contactId, req.params.id];
		
		ContactsGroups.createRecord(values)
		.then(() => {
			res.redirect('/groups');
		})
		.catch(err => {
			if (err) throw err;
		});
	}
}

module.exports = GroupsCtrl;