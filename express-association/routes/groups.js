const express = require('express')
const router = express.Router()
const Group = require('../models/groups')
const Contact = require('../models/contacts')

router.get('/', function(req, res){
	Group.findAll()
	.then(function(groups){
		Group.findGroupContact()
		.then(function(groupsContact){
			res.render('groups', {
				dataGro: groups,
				dataGC: groupsContact,
				title: 'Groups Page'
			})
		})
	})
	.catch(function(err){
		res.send(err)
	})
})

router.post('/', function(req, res){
	Group.save(req.body)
	.then(function(){
		res.redirect('/groups')
	})
})

router.get('/edit/:id', function(req, res){
	Group.findById(req.params.id)
	.then(function(groups){
		res.render('groupsEdit', {
			data: groups,
			title: 'Edit Group Page'
		})
	})
})

router.post('/edit/:id', function(req, res){
	Group.update(req.body, req.params.id)
	.then(function(){
		res.redirect('/groups')
	})
})

router.get('/delete/:id', function(req, res){
	Group.delete(req.params.id)
	.then(function(){
		res.redirect('/groups')
	})
})

// Contact yang di Groups

router.get('/contact/:id', function(req, res){
	Group.findById(req.params.id)
	.then(function(groupID){
		Contact.findAll()
		.then(function(contacts){
			res.render('groupsContact', {
				dataGro: groupID,
				dataCon: contacts,
				title: 'Group Contacts Page'
			})
		})
	})
})

router.post('/contact/:id', function(req, res){
	Group.addContact(req.body, req.params.id)
	.then(function(){
		res.redirect('/groups')
	})
})

module.exports = router