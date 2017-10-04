const express = require('express');
const router = express.Router();
const AddressesCtrl = require('./../controllers/addresses');

router.get('/', (req, res) => {
	AddressesCtrl.serveAddresses(req, res);
});

router.post('/', (req, res) => {
	AddressesCtrl.createAddress(req, res);
});

router.get('/:id/edit', (req, res) => {
	AddressesCtrl.editAddress(req, res);
});

router.post('/:id/edit', (req, res) => {
	AddressesCtrl.updateAddress(req, res);
});

router.get('/:id/delete', (req, res) => {
	AddressesCtrl.deleteAddress(req, res);
});

module.exports = router;