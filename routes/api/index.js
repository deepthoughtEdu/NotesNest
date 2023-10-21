
var express = require('express');
var router = express.Router();

const authenticationRoutes = require('./authentication');

router.use('/', authenticationRoutes);

module.exports = router;
