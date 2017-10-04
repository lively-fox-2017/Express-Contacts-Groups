const express = require('express')
const router = express.Router()
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./db/data.db')
const Address = require('../models/addresses')
const Contact = require('../models/contacts')

router.get('/', function(req, res){
	Address.findAll()
	.then(function(addresses){
		Contact.findAll()
		.then(function(contacts){
			res.render('addresses', {
				dataAdd: addresses,
				dataCon: contacts,
				title: 'Addresses Page'
			})
		})
	})
	.catch(function(err){
		res.send(err)
	})
})

router.post('/', function(req, res){
	Address.save(req.body)
	.then(function(){
		res.redirect('/addresses')
	})
})

router.get('/edit/:id', function(req, res){
	Address.findById(req.params.id)
	.then(function(address){
		Contact.findAll()
		.then(function(contacts){
			res.render('addressEdit', {
				dataAdd: address,
				dataCon: contacts,
				title: 'Edit Address Page'
			})
		})
	})
	.catch(function(err){
		res.send(err)
	})
})

router.post('/edit/:id', function(req, res){
	Address.update(req.body, req.params.id)
	.then(function(){
		res.redirect('/addresses')
	})
})

router.get('/delete/:id', function(req, res){
	Address.delete(req.params.id)
	.then(function(){
		res.redirect('/addresses')
	})
})

module.exports = router