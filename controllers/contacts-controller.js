"use strict"

const Contacts = require('./../models/contacts');
const Profiles = require('./../models/profiles');
const Groups = require('./../models/groups');
const Addresses = require('./../models/addresses');

class ContactsController {
	constructor() {
		this._contacts = new Contacts();
		this._profiles = new Profiles();
		this._groups = new Groups();
		this._addresses = new Addresses();
	}
	createContact(req, res) {
		let columnValues = [req.body.name, req.body.company, req.body.telp_number, req.body.email];

		this._contacts.createRecord(columnValues)
						.then(() => {
							res.redirect('/contacts');
						})
						.catch(err => {
							throw err;
						});
	}

	serveContacts(req, res) {
		this._contacts.readRecords()
						.then(records => {
							res.render('contacts', {records});
						})
						.catch(err => {
							throw err;
						});
	}

	serveContact(req, res) {
		this._contacts.readRecord(req.params.id)
						.then(record => {
							res.render('contact-edit', {record});
						})
						.catch(err => {
							throw err;
						});
	}

	updateContact(req, res) {
		let columnValues = [req.body.name, req.body.company, req.body.telp_number, req.body.email];

		this._contacts.updateRecord(columnValues, req.params.id)
						.then(() => {
							res.redirect('/contacts');
						})
						.catch(err => {
							throw err;
						});
	}

	deleteContact(req, res) {
		this._contacts.deleteRecord(req.params.id)
						.then(() => {
							res.redirect('/contacts');
						})
						.catch(err => {
							throw err;
						});
	}

	showAddresses(req, res) {
		let iter = [this._contacts.readRecord(req.params.id), this._addresses.findAddresses(req.params.id)];

		Promise.all(iter)
						.then(values => {
							let data = { contact: values[0], addresses: values[1] };
							res.render('contact-addresses', {data});
						});
	}
}

module.exports = ContactsController;