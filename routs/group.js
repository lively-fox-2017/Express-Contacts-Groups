const express = require('express');
const router = express.Router()
const Group = require('../models/group')
const Contact = require('../models/contact')
const ContactGroup = require('../models/contactGroup')
router.get ('/', function (req, res) {
	Group.findAll().then(rows => {
		res.render('group',{group:rows})
	}).catch(err => {
		res.send(err)
	})
});
router.post('/', function(req, res) {
	Group.add(req.body).then(msg => {
		res.redirect('/groups')
	}).catch(err => {
		res.send(err)
	})
})
router.get("/edit/:id", function(req,res){
	Group.findById(req.params.id).then(row => {
	   	res.render("edit_group",{data:row})		
	}).catch(err => {
		res.send(err)
	})
});
router.post('/edit/:id', function(req,res) {
	Group.edit(req.params.id,req.body).then(msg => {
	  	res.redirect('/groups');
	}).then(err => {
		res.send(err)
	})
});
router.get('/delete/:id', function(req,res){
	Group.del(req.params.id).then(msg => {
		res.redirect('/groups')
	}).catch(err => {
		res.send(err)
	})
});
router.get('/assign/:id', function(req,res){
	Promise.all([
		Contact.findAll(),
		Group.findById(req.params.id)
	]).then(resource => {
		res.render('groups_assign', {contact:resource[0],group:resource[1]})
	}).catch(err => {
		res.send(err)
	})
})
router.post('/assign', function(req,res){
	ContactGroup.add(req.body).then(msg => {
		res.redirect('/groups')
	}).catch(err => {
		res.send(err)
	})
})
module.exports = router
