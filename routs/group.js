const express = require('express');
const router = express.Router()
const Group = require('../models/group')
const Contact = require('../models/contact')
const ContactGroup = require('../models/contactGroup')
router.get ('/', function (req, res) {
	Group.findAll(rows => {
		res.render('group',{group:rows})
	})
});
router.post('/', function(req, res) {
	Group.add(req.body)
	res.redirect('/groups')
})
router.get("/edit/:id", function(req,res){
	Group.findById(req.params.id, row => {
	   	res.render("edit_group",{data:row})		
	})
});
router.post('/edit/:id', function(req,res) {
	Group.edit(req.params.id,req.body)
  	res.redirect('/groups');
});
router.get('/delete/:id', function(req,res){
	Group.del(req.params.id)
	res.redirect('/groups')
});
router.get('/assign/:id', function(req,res){
	Contact.findAll(contacts => {
		Group.findById(req.params.id, row_group => {
			res.render('groups_assign', {contact:contacts,group:row_group})
		})
	})
})
router.post('/assign', function(req,res){
	ContactGroup.add(req.body)
	res.redirect('/groups')
})
module.exports = router
