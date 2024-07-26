var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send(
        "Welcome to the home page"
    );
});
router.get('/check', function (req, res, next) {
    res.send(
        "Connection is working"
    );
});

module.exports = router;
