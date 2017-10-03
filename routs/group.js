const express = require('express');
const router = express.Router()
const Group = require('../models/group')
const Contact = require('../models/group')
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
	
})
module.exports = router
