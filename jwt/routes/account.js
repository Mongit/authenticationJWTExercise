var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var db = require('./../database/db.js');
var moment = require('moment');


var tokenVerification = require('./../middlewares/tokenVerification');

/* GET home page. */
router.post('/login', function(req, res, next) {
            
    var user =  db.findByUserName(req.body.username);  
    
    if (!user) {
        // incorrect username        
        return res.status(401).send('invalid credentials');
    }

    if (!user.password === req.body.password) {
        // incorrect password
        return res.status(401).send('invalid credentials');
    }

    var expires = moment().add(15, 'minutes').valueOf();
    var token = jwt.encode({
        iss: user.id,
        exp: expires
    }, 'MY_SECRET_STRING');

    res.json({
        token : token,
        expires: expires,
        username: user.username
    });
});

router.post('/logout', function(req, res, next) {
    //get token
    //change expiration date
    //return expired token
    
    res.json({
        token : undefined,
        expires: undefined,
        username: undefined
    });
});

module.exports = router;