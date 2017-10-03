const express = require('express')
const router = express.Router()
const Contact = require('../models/contact')
const Group = require('../models/group')
const Address = require('../models/address')
router.get ('/', function (req, res) {
	Contact.findAll(rows_contact => {
		Group.findAll(rows_group => {
			res.render('contact', {contact:rows_contact,group:rows_group});
		})
	})
});
router.post('/', function(req, res) {
	let input = {name:req.body.name,company:req.body.company,tlp_number:req.body.tlp_number,email:req.body.email}
	Contact.add(input,req.body.id_group)
	res.redirect('/contacts')
})
router.get("/edit/:id", function(req,res){
	Contact.findById(req.params.id, row => {
		res.render("edit_contact",{data:row})
	})	
});
router.post('/edit/:id', function(req,res) {
	Contact.edit(req.params.id,req.body)
	res.redirect('/contacts');
	
});
router.get('/delete/:id', function(req,res){
	Contact.del(req.params.id)
	res.redirect('/contacts')
});
router.get('/address/:id', (req,res) => {
	let params = {column:'id_contact',find:req.params.id}
	Address.findWhere(params,rows_address => {
		Contact.findById(req.params.id, row_contact => {
			res.render('contacts_address', {address:rows_address, contact:row_contact})
		})
	})
})
router.get('/group/:id', (req,res) => {
	
})
module.exports = router