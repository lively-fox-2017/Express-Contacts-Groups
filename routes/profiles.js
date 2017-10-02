const express = require('express');
const router = express.Router();
const ProfilesController = require('./../controllers/profiles-controller');

let profilesController = new ProfilesController();

router.get('/', (req, res) => {
	profilesController.serveProfiles(req, res);
});

router.post('/', (req, res) => {
	profilesController.createProfile(req, res);
});

router.get('/edit/:id', (req, res) => {
	profilesController.serveProfile(req, res);
});

router.post('/edit/:id', (req, res) => {
	profilesController.updateProfile(req, res);
});

router.get('/delete/:id', (req, res) => {
	profilesController.deleteProfile(req, res);
});

module.exports = router;