"use strict"

const Contacts = require('./../models/contacts');
const Profiles = require('./../models/profiles');
const Groups = require('./../models/groups');
const Addresses = require('./../models/addresses');

class ProfilesController {
	constructor() {
		this._contacts = new Contacts();
		this._profiles = new Profiles();
		this._groups = new Groups();
		this._addresses = new Addresses();
	}

	createProfile(req, res) {
		let columnValues = [req.body.username, req.body.password, req.body.contactId];

		this._profiles.createRecord(columnValues)
				.then(() => {
					res.redirect('/profiles');
				})
				.catch(err => {
					// error no 19: SQLITE_CONSTRAINT
					if (err.errno === 19) res.render('error', {err});	// ERROR HANDLINGNYA BENERIN LAGI
					else throw err;					
				});
	}

	serveProfiles(req, res) {
		const iter = [
			this._profiles.readRecords(), 
			this._contacts.readRecords()
		];

		Promise.all(iter)
				.then(values => {
					let data = { profiles: values[0], contacts: values[1], err: null }
					res.render('profiles', {data});
				})
				.catch(err => {
					throw err;
				});
	}

	serveProfile(req, res) {
		const iter = [
			this._profiles.readRecord(req.params.id),
			this._contacts.readRecords()
		];

		Promise.all(iter)
				.then(values => {
					let data = { profile: values[0], contacts: values[1], err: null };
					res.render('profile-edit', {data});
				})
				.catch(err => {
					throw err;
				});
	}

	updateProfile(req, res) {
		let columnValues = [req.body.username, req.body.password, req.body.contactId];
		this._profiles.updateRecord(columnValues, req.params.id)
				.then(() => {
					res.redirect('/profiles');
				})
				.catch(err => {
					// error no 19: SQLITE_CONSTRAINT
					if (err.errno === 19) res.render('error', {err});	// ERROR HANDLINGNYA BENERIN LAGI
					else throw err;	
				});
	}

	deleteProfile(req, res) {
		this._profiles.deleteRecord(req.params.id)
				.then(() => {
					res.redirect('/profiles');
				})
				.catch(err => {
					throw err;
				});
	}
}

module.exports = ProfilesController;