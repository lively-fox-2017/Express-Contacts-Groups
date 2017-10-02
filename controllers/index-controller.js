"use strict"

class IndexController {
	constructor() {}

	serveIndex(req, res) {
		res.render('index');
	}
}

module.exports = IndexController;