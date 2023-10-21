var express = require('express');
var router = express.Router();
var apiRouter = require('./api');
var pageRouter = require('./pages');

router.use('/api', apiRouter);
router.use('/', pageRouter);

module.exports = router;
