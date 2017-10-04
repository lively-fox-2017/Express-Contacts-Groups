"use strict"

const express = require('express');
const router = express.Router();
const Index = require('./../controllers/index');

router.get('/', (req, res) => {
	Index.serveIndex(req, res);
});

module.exports = router;