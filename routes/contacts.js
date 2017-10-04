const express = require('express');
const router = express.Router();
const ContactsCtrl = require('./../controllers/contacts');

router.get('/', (req, res) => {
	ContactsCtrl.serveContacts(req, res);
});

router.post('/', (req, res) => {
	ContactsCtrl.createContact(req, res);
});

router.get('/:id/edit', (req, res) => {
	ContactsCtrl.editContact(req, res);
});

router.post('/:id/edit', (req, res) => {
	ContactsCtrl.updateContact(req, res);
});

router.get('/:id/delete', (req, res) => {
	ContactsCtrl.deleteContact(req, res);
});

router.get('/:id/address', (req, res) => {
	ContactsCtrl.showAddress(req, res);
});

router.post('/:id/address', (req, res) => {
	ContactsCtrl.addAddress(req, res);
});

module.exports = router;