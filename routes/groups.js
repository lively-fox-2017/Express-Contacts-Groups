const express = require('express');
const router = express.Router();
const GroupsController = require('./../controllers/groups-controller');

let groupsController = new GroupsController();

router.get('/', (req, res) => {
	groupsController.serveGroups(req, res);
});

router.post('/', (req, res) => {
	groupsController.createGroup(req, res);
});

router.get('/edit/:id', (req, res) => {
	groupsController.serveGroup(req, res);
});

router.post('/edit/:id', (req, res) => {
	groupsController.updateGroup(req, res);
});

router.get('/delete/:id', (req, res) => {
	groupsController.deleteGroup(req, res);
});

module.exports = router;