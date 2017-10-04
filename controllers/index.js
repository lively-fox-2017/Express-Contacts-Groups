"use strict"

class Index {
	static serveIndex(req, res) {
		res.render('index');
	}
}

module.exports = Index;