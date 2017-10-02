const express = require('express');
const router = express.Router();
const IndexController = require('./../controllers/index-controller');

let indexController = new IndexController();

router.get('/', (req, res) => {
	indexController.serveIndex(req, res);
});

module.exports = router;