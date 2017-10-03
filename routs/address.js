const express = require('express')
const router = express.Router()
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');
const Address = require('../models/address')
const Contact = require('../models/contact')
router.get ('/', function (req, res) {
	Address.findAll(rows_address => {
		Contact.findAll(rows_contatc => {
	      	res.render('address', {address: rows_address, contacts:rows_contatc});
		})
	})
});
router.post('/', function(req, res) {
	Address.add(req.body)
	res.redirect('/address')
})
router.post('/add', function(req, res) {
	Address.add(req.body)
	res.redirect('/address')
})
router.get("/edit/:id", function(req,res){
	Address.findById(req.params.id, row => {
		Contact.findAll(rows_contact => {
	    	res.render("edit_address",{data:row, contacts:rows_contact})
		})
	})
});
router.post('/edit/:id', function(req,res) {
	Address.edit(req.params.id,req.body)
	res.redirect('/address');
});
router.get('/delete/:id', function(req,res){
	Address.del(req.params.id)
	res.redirect('/address')
});

module.exports = router