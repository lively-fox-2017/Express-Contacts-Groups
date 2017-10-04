"use strict"

const Profiles = require('./../models/profiles');
const Contacts = require('./../models/contacts');

class ProfilesCtrl {
	static serveProfiles(req, res) {
		const readProfiles = () => {
			return new Promise((resolve, reject) => {
				Profiles.readAllRecords()
				.then(profiles => {
					return new Promise((resolve, reject) => {
						let profilesWithContact = profiles.map(profile => {
							return new Promise((resolve, reject) => {
								Contacts.readRecord(profile.contactId)
								.then(contact => {
									profile['contact'] = contact;
									resolve(profile);
								})
								.catch(err => {
									if (err) throw err;
								});
							});
						});

						Promise.all(profilesWithContact)
						.then(profilesWithContact => {
							resolve(profilesWithContact);
						})
						.catch(err => {
							if (err) throw err;
						});
					});
				})
				.then(profilesWithContact => {
					resolve(profilesWithContact);
				})
				.catch(err => {
					if (err) throw err;
				});
			});
		}

		Promise.all([readProfiles(), Contacts.readAllRecords()])
		.then(values => {
			let data = {profiles: values[0], contacts: values[1]}
			res.render('profiles', {data});
		})
		.catch(err => {
			if (err) throw err;
		});
		
	}

	static createProfile(req, res) {
		const values = [req.body.username, req.body.password, req.body.contactId].map(val => '\'' + val + '\'');
		Profiles.createRecord(values)
		.then(() => {
			res.redirect('/profiles');
		})
		.catch(err => {
			if (err.errno === 19) {
				let err = new Error('Unique Constraint Failed');
				res.render('error', {err});
			} else {
				throw err;
			}
		});
	}

	static editProfile(req, res) {
		Promise.all([Profiles.readRecord(req.params.id), Contacts.readAllRecords()])
		.then(values => {
			let data = {profile: values[0], contacts: values[1]};
			res.render('profile-edit', {data});
		})
		.catch(err => {
			if (err) throw err;
		});
	}

	static updateProfile(req, res) {
		const values = [req.body.username, req.body.password, req.body.contactId];
		Profiles.updateRecord(req.params.id, values)
		.then(() => {
			res.redirect('/profiles');
		})
		.catch(err => {
			if (err.errno === 19) {
				let err = new Error('Unique Constraint Failed');
				res.render('error', {err});
			} else {
				throw err;
			}
		});
	}

	static deleteProfile(req, res) {
		Profiles.deleteRecord(req.params.id)
		.then(() => {
			res.redirect('/profiles');
		})
		.catch(err => {
			if (err) throw err;
		});
	}
}

module.exports = ProfilesCtrl;