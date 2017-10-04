"use strict"

const Addresses = require('./../models/addresses');
const Contacts = require('./../models/contacts');

class AddressesCtrl {
	static serveAddresses(req, res) {

		const readAddresses = () => {
			return new Promise((resolve, reject) => {
				Addresses.readAllRecords()
				.then(addresses => {
					return new Promise((resolve, reject) => {
						const addressesWithContact = addresses.map(address => {
							return new Promise((resolve, reject) => {
								Contacts.readRecord(address.contactId)
								.then(contact => {
									address['owner'] = contact;
									resolve(address);
								})
								.catch(err => {
									if (err) throw err;
								});
							});
						});

						Promise.all(addressesWithContact)
						.then(addresses => {
							resolve(addresses);
						})
						.catch(err => {
							if (err) throw err;
						});
					});
				})
				.then(addresses => {
					resolve(addresses);
				})
				.catch(err => {
					if (err) throw err;
				});
			});
		}

		Promise.all([readAddresses(), Contacts.readAllRecords()])
		.then(values => {
			let data = {addresses: values[0], contacts: values[1]}
			res.render('addresses', {data});
		})
		.catch(err => {
			if (err) throw err;
		});
	}

	static createAddress(req, res) {
		const values = [req.body.street, req.body.city, req.body.zipcode, req.body.contactId].map(val => '\'' + val + '\'');
		Addresses.createRecord(values)
		.then(() => {
			res.redirect('/addresses');
		})
		.catch(err => {
			if (err) throw err;
		});
	}

	static editAddress(req, res) {
		Promise.all([Addresses.readRecord(req.params.id), Contacts.readAllRecords()])
		.then(values => {
			let data = {address: values[0], contacts: values[1]}
			res.render('address-edit', {data});
		})
		.catch(err => {
			if (err) throw err;
		});
	}

	static updateAddress(req, res) {
		const values = [req.body.street, req.body.city, req.body.zipcode, req.body.contactId];
		Addresses.updateRecord(req.params.id, values)
		.then(() => {
			res.redirect('/addresses');
		})
		.catch(err => {
			if (err) throw err;
		});
	}

	static deleteAddress(req, res) {
		Addresses.deleteRecord(req.params.id)
		.then(() => {
			res.redirect('/addresses');
		})
		.catch(err => {
			if (err) throw err;
		});
	}
}

module.exports = AddressesCtrl;