"use strict"

const Contacts = require('./../models/contacts');
const Profiles = require('./../models/profiles');
const Groups = require('./../models/groups');
const Addresses = require('./../models/addresses');

class GroupsController {
	constructor() {
		this._contacts = new Contacts();
		this._profiles = new Profiles();
		this._groups = new Groups();
		this._addresses = new Addresses();
	}

	createGroup(req, res) {
		let columnValues = [req.body.name_of_group];

		this._groups.createRecord(columnValues)
					.then(() => {
						res.redirect('/groups');
					})
					.catch(err => {
						throw err;
					});
	}

	serveGroups(req, res) {
		this._groups.readRecords()
					.then(records => {
						res.render('groups', {records});
					})
					.catch(err => {
						throw err;
					});
	}

	serveGroup(req, res) {
		this._groups.readRecord(req.params.id)
					.then(record => {
						res.render('group-edit', {record});
					})
					.catch(err => {
						throw err;
					});
	}

	updateGroup(req, res) {
		let columnValues = [req.body.name_of_group];
		this._groups.updateRecord(columnValues, req.params.id)
					.then(() => {
						res.redirect('/groups');
					})
					.catch(err => {
						throw err;
					});
	}

	deleteGroup(req, res) {
		this._groups.deleteRecord(req.params.id)
					.then(() => {
						res.redirect('/groups');
					})
					.catch(err => {
						throw err;
					});
	}
}

module.exports = GroupsController;