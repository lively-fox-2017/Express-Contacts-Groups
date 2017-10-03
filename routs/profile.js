const express = require('express')
const router = express.Router()
const Profile = require('../models/profile')
const Contact = require('../models/contact')

router.get ('/', function (req, res) {
	Profile.findAll(rows_profile => {
		Contact.findAll(rows_contact => {
			// res.send(rows_profile)
			res.render('profile',{profile:rows_profile,contact:rows_contact,msg:''})
		})
	})
});
router.post('/', function(req, res) {
	Profile.add(req.body, function(cb){
		if(cb == true){ res.redirect('/profiles')}else{res.render('profile',cb)}
	})
})
router.get("/edit/:id", function(req,res){
	Profile.findById(req.params.id, cb => {
      	res.render("edit_profile", cb)
	})
});
router.post('/edit/:id', function(req,res) {
	Profile.edit(req.params.id,req.body)
    res.redirect('/profiles');
});
router.get('/delete/:id', function(req,res){
	Profile.del(req.params.id)
	res.redirect('/profiles')
});

module.exports = router