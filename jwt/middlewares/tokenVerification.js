var jwt = require('jwt-simple');
var db = require('./../database/db.js');

module.exports = function(req, res, next) {
    /*
        For maximum flexibility, we’ll allow the client to attach a token in one of three ways 

        – as a query string parameter, 
        - a form body parameter, 
        - or in an HTTP header. 

        For the latter, we’ll use the header x-access-token
    */

    var token =  
    (req.body && req.body.access_token) ||
        (req.query && req.query.access_token) ||
        req.headers['x-access-token'];
    
    if (token) {
        try {
            var decoded = jwt.decode(token, 'MY_SECRET_STRING');
            
            if(decoded.exp <= Date.now()) {
                res.status(401).send('Access token has expired');
            }
            
            var user = db.find(decoded.iss);
            req.user = user;
            
            return next();
        } catch (err) {
            res.status(401).send('Invalid token');
        }
    } else {
        res.status(401).send('No token');
    }
};