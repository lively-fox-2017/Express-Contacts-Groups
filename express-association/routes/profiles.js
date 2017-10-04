const express = require('express')
const router = express.Router()
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./db/data.db')
const Profile = require('../models/profiles')
const Contact = require('../models/contacts')

router.get('/', function(req, res){
	Profile.findAll()
	.then(function(profiles){
		Contact.findAll()
		.then(function(contacts){
			res.render('profiles', {
				dataPro: profiles,
				dataCon: contacts,
				dataErr: null,
				dataNoErr: null,
				title: 'Profiles Page'
			})
		})
	})
})

router.post('/', function(req, res){
	Profile.save(req.body)
	.then(function(){
		res.redirect('/profiles')
	})
	.catch(function(error){
		Profile.findAll()
		.then(function(profiles){
			Contact.findAll()
			.then(function(contacts){
				res.render('profiles', {
					dataPro: profiles,
					dataCon: contacts,
					dataErr: error,
					title: 'Profiles Page'
				})
			})
		})
	})
})

router.get('/edit/:id', function(req, res){
	Profile.findById(req.params.id)
	.then(function(profileId){
		Profile.findAll()
		.then(function(profiles){
			Contact.findAll()
			.then(function(contacts){
				res.render('profilesEdit', {
					dataProId: profileId,
					dataPro: profiles,
					dataCon: contacts,
					title: 'Edit Profiles Page'
				})
			})
		})
	})
})

router.post('/edit/:id', function(req, res){
	Profile.update(req.body, req.params.id)
	.then(function(success){
		Profile.findAll()
		.then(function(profiles){
			Contact.findAll()
			.then(function(contacts){
				res.render('profiles', {
					dataPro: profiles,
					dataCon: contacts,
					dataErr: null,
					dataNoErr: success,
					title: 'Profile Page'
				})
			})
		})
	})
	.catch(function(error){
		Profile.findAll()
		.then(function(profiles){
			Contact.findAll()
			.then(function(contacts){
				res.render('profiles', {
					dataPro: profiles,
					dataCon: contacts,
					dataErr: error,
					dataNoErr: null,
					title: 'Edit Profile Page'
				})
			})
		})
	})
})

router.get('/delete/:id', function(req, res){
	Profile.delete(req.params.id)
	.then(function(){
		res.redirect('/profiles')
	})
	.catch(function(err){
		res.send(err)
	})
})

module.exports = router