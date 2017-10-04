"use strict"

const express = require('express');
const router = express.Router();
const GroupsCtrl = require('./../controllers/groups');

router.get('/', (req, res) => {
	GroupsCtrl.serveGroups(req, res);
});

router.post('/', (req, res) => {
	GroupsCtrl.createGroup(req, res);
});

router.get('/:id/edit', (req, res) => {
	GroupsCtrl.editGroup(req, res);
});

router.post('/:id/edit', (req, res) => {
	GroupsCtrl.updateGroup(req, res);
});

router.get('/:id/delete', (req, res) => {
	GroupsCtrl.deleteGroup(req, res);
});

router.get('/:id/assign-contact', (req, res) => {
	GroupsCtrl.assignContact(req, res);
});

router.post('/:id/assign-contact', (req, res) => {
	GroupsCtrl.updateContact(req, res);
});

module.exports = router;