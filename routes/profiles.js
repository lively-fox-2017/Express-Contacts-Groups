"use strict"

const express = require('express');
const router = express.Router();
const ProfilesCtrl = require('./../controllers/profiles');

router.get('/', (req, res) => {
	ProfilesCtrl.serveProfiles(req, res);
});

router.post('/', (req, res) => {
	ProfilesCtrl.createProfile(req, res);
});

router.get('/:id/edit', (req, res) => {
	ProfilesCtrl.editProfile(req, res);
});

router.post('/:id/edit', (req, res) => {
	ProfilesCtrl.updateProfile(req, res);
});

router.get('/:id/delete', (req, res) => {
	ProfilesCtrl.deleteProfile(req, res);
});

module.exports = router;