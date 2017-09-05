'use strict';

const Router = require('node-router');
const router = new Router();
const route = router.push ;
const logger = require('./util/logger');
const bodyParser = require('body-parser');

route('POST', bodyParser.urlencoded({extended: false}));

// Default route
route('/', function defaultHandler (req, res) {
    res.send('No such route');
});

route(function errorHandler (err, req, res) {
    logger.error(err);
    res.send(err);
});

module.exports = router;