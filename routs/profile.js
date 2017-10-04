const express = require('express')
const router = express.Router()
const Profile = require('../models/profile')
const Contact = require('../models/contact')

router.get ('/', function (req, res) {
	Promise.all([
		Profile.findAll(),
		Contact.findAll()
	]).then(resource => {
		res.render('profile',{profile:resource[0],contact:resource[1],msg:''})
	}).catch()
});
router.post('/', function(req, res) {
	Profile.add(req.body).then(cb => {
		if(cb == true){ 
			res.redirect('/profiles')
		} else {
			res.render('profile',cb)
		}
	}).catch(err => {
		res.send(err)
	})
})
router.get("/edit/:id", function(req,res){
	Profile.findById(req.params.id).then(cb => {
      	res.render("edit_profile", cb)
	}).catch(err => {
		res.send(err)
	})
});
router.post('/edit/:id', function(req,res) {
	Profile.edit(req.params.id,req.body).then(msg => {
	    res.redirect('/profiles');
	}).catch(err => {
		res.send(err)
	})
});
router.get('/delete/:id', function(req,res){
	Profile.del(req.params.id).then(msg => {
		res.redirect('/profiles')
	}).catch(err => {
		res.send(err)
	})
});

module.exports = router