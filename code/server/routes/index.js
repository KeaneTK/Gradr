var _express = require('express');
var router = _express.Router();

router.get("/", function(req, res) {
    res.render('../views/index', {});
});

router.get("/signup", function(req,res) {
	res.render('../views/signup', {});
});

router.get("/main", function(req, res) { 
    res.render('../views/swipe', {});
});

router.get("/profile", function(req, res) {
	res.render('../views/profile');
});

router.get("/matches", function(req, res) {
	res.render('../views/matches');
});

module.exports = {router};

