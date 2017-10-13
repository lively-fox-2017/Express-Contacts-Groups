const express = require('express')
const router = express.Router()
const Contact = require('../models/contact')
const Group = require('../models/group')
const Address = require('../models/address')
const ContactGroup = require('../models/contactGroup')

router.get ('/', function (req, res) {
	Promise.all([
		Contact.findAll(),
		Group.findAll()
	]).then(resource => {
		res.render('contact', {contact:resource[0],group:resource[1]});
	}).catch(err => {
		res.send(err)
	})
});
router.post('/', function(req, res) {
	let input_contact = {name:req.body.name,company:req.body.company,tlp_number:req.body.tlp_number,email:req.body.email}
	Contact.add(input_contact).then(row => {
		if(req.body.id_group != '') {
			let input_group = {id_contact:row, id_group:req.body.id_group}
			ContactGroup.add(input_group).then(msg => {
				res.redirect('/contacts')
			})
		} else {
			res.redirect('/contacts')
		}
	}).catch(err => {
		res.send(err)
	})
})
router.get("/edit/:id", function(req,res){
	Contact.findById(req.params.id).then(row => {
		res.render("edit_contact",{data:row})
	}).catch(err => {
		res.send(err)
	})
});
router.post('/edit/:id', function(req,res) {
	Contact.edit(req.params.id,req.body).then(msg => {
		res.redirect('/contacts');
	}).catch(err => {
		res.send(err)
	})
});
router.get('/delete/:id', function(req,res){
	Contact.del(req.params.id).then(msg => {
		res.redirect('/contacts')
	}).catch(err => {
		res.send(err)
	})
});
router.get('/address/:id', (req,res) => {
	let params = {column:'id_contact',find:req.params.id}
	Promise.all([
		Address.findWhere(params),
		Contact.findById(req.params.id)
	]).then(resource => {
		res.render('contacts_address', {address:resource[0], contact:resource[1]})
	}).catch(err => {
		res.send(err)
	})
})
router.get('/groups/:id', (req,res) => {
	Promise.all([
		Contact.findById(req.params.id),
		ContactGroup.findAll(),
		Group.findAll()
	]).then(resource => {
		res.render('contacts_groups', {contact:resource[0],contactGroup:resource[1],group:resource[2]})
	}).catch(err => {
		res.send(err)
	})
	
})
module.exports = router