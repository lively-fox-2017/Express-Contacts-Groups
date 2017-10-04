const express = require('express')
const router = express.Router()
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./db/data.db')
const Contact = require('../models/contacts')

router.get('/', function(req, res){
	Contact.findAll()
	.then(function(contacts){
		res.render('contacts', {data: contacts, title: 'Contacts Page'})
	})
})

router.post('/', function(req, res){
	Contact.save(req.body)
	.then(function(){
		res.redirect('/contacts')
	})
})

router.get('/edit/:id', function(req, res){
	Contact.findById(req.params.id)
	.then(function(contacts){
		res.render('contactsEdit', {data: contacts[0], title: 'Edit Contact Page'})
	})
})

router.post('/edit/:id', function(req, res){
	Contact.update(req.body, req.params.id)
	.then(function(){
		res.redirect('/contacts')
	})
})

router.get('/delete/:id', function(req, res){
	Contact.delete(req.params.id)
	.then(function(){
		res.redirect('/contacts')
	})
})

// Address di Contact

router.get('/address/:id', function(req, res){
	Contact.findById(req.params.id)
	.then(function(contacts){
		Contact.findAddress(req.params.id)
		.then(function(addresses){
			res.render('addressContact', {
				dataAdd: addresses,
				dataCon: contacts[0],
				title: 'Addresses Contact Page'
			})
		})
	})
})

router.post('/address/:id', function(req, res){
	Contact.saveAddress(req.body, req.params.id)
	.then(function(){
		res.redirect('/contacts')
	})
})

module.exports = router