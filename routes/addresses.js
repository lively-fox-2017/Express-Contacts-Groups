const express = require('express');
const router = express.Router();
const AddressesController = require('./../controllers/addresses-controller');

let addressesController = new AddressesController();

router.get('/', (req, res) => {
	addressesController.serveAddresses(req, res);
});

router.post('/', (req, res) => {
	addressesController.createAddress(req, res);
});

router.get('/edit/:id', (req, res) => {
	addressesController.serveAddress(req, res);
});

router.post('/edit/:id', (req, res) => {
	addressesController.updateAddress(req, res);
});

router.get('/delete/:id', (req, res) => {
	addressesController.deleteAddress(req, res);
});

module.exports = router;