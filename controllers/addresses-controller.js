"use strict"

const Contacts = require('./../models/contacts');
const Profiles = require('./../models/profiles');
const Groups = require('./../models/groups');
const Addresses = require('./../models/addresses');

class AddressesController {
	constructor() {
		this._contacts = new Contacts();
		this._profiles = new Profiles();
		this._groups = new Groups();
		this._addresses = new Addresses();
	}
	createAddress(req, res) {
		let columnValues = [req.body.street, req.body.city, req.body.zipcode, req.body.contactId];

		this._addresses.createRecord(columnValues)
				.then(() => {
					res.redirect('/addresses');
				})
				.catch(err => {
					throw err;
				});
	}

	serveAddresses(req, res) {
		let iter = [this._addresses.readRecords(), this._contacts.readRecords()];

		Promise.all(iter)
				.then(values => {
					let data = {
						addresses: values[0],
						contacts: values[1]
					}

					res.render('addresses', {data});
				})
				.catch(err => {
					throw err;
				});
	}

	serveAddress(req, res) {
		let iter = [this._addresses.readRecord(req.params.id), this._contacts.readRecords()];

		Promise.all(iter)
				.then(values => {
					let data = {
						address: values[0],
						contacts: values[1]
					}
					res.render('address-edit', {data});
				})
				.catch(err => {
					throw err;
				});
	}

	updateAddress(req, res) {
		let columnValues = [req.body.street, req.body.city, req.body.zipcode, req.body.contactId];

		this._addresses.updateRecord(columnValues, req.params.id)
				.then(() => {
					res.redirect('/addresses');
				})
				.catch(err => {
					throw err;
				});
	}

	deleteAddress(req, res) {
		this._addresses.deleteRecord(req.params.id)
				.then(() => {
					res.redirect('/addresses');
				})
				.catch(err => {
					throw err;
				});
	}
}

module.exports = AddressesController;