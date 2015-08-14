var express = require('express');
var router = express.Router();

var tokenVerification = require('./../middlewares/tokenVerification');

router.get('/date', tokenVerification, function(req, res, next) {
    console.log("Something happend here");
    res.json(new Date());
});

module.exports = router;