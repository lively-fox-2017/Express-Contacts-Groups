const express = require('express')
const router = express.Router()
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');
const Address = require('../models/address')
const Contact = require('../models/contact')
router.get ('/', function (req, res) {
	Promise.all([
		Address.findAll(),
		Contact.findAll()		
	]).then(resource => {
      	res.render('address', {address:resource[0], contacts:resource[1]});
	}).catch(err => {
		res.send(err)
	})
});
router.post('/', function(req, res) {
	Address.add(req.body).then(msg => {
		res.redirect('/address')
	}).catch(err => {
		res.send(err)
	})
})
router.post('/add', function(req, res) {
	Address.add(req.body).then(msg => {
		res.redirect('/address')
	}).catch(err => {
		res.send(err)
	})
})
router.get("/edit/:id", function(req,res){
	Promise.all([
		Address.findById(req.params.id),
		Contact.findAll()
	]).then(resource => {
    	res.render("edit_address",{data:resource[0], contacts:resource[1]})
	}).catch(err => {
		res.send(err)
	})
});
router.post('/edit/:id', function(req,res) {
	Address.edit(req.params.id,req.body).then(msg => {
		res.redirect('/address');
	}).catch(err => {
		res.send(err)
	})
});
router.get('/delete/:id', function(req,res){
	Address.del(req.params.id).then(msg => {
		res.redirect('/address')
	}).catch(err => {
		res.send(err)
	})
});

module.exports = router