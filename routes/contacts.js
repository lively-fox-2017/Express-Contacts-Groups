const express = require('express');
const router = express.Router();
const ContactsController = require('./../controllers/contacts-controller');

let contactsController = new ContactsController();

router.get('/', (req, res) => {
	contactsController.serveContacts(req, res);
});

router.post('/', (req, res) => {
	contactsController.createContact(req, res);
});

router.get('/edit/:id', (req, res) => {
	contactsController.serveContact(req, res);
});

router.post('/edit/:id', (req, res) => {
	contactsController.updateContact(req, res);
});

router.get('/delete/:id', (req, res) => {
	contactsController.deleteContact(req, res);
});

router.get('/addresses/:id', (req, res) => {
	contactsController.showAddresses(req, res);
});

module.exports = router;