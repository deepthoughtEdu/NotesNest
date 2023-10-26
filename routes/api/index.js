
var express = require('express');
var router = express.Router();

const authenticationRoutes = require('./authentication');
const userRoutes = require('./user');
const noteRoutes = require('./note');

router.use('/auth', authenticationRoutes);
router.use('/user', userRoutes);
router.use('/note', noteRoutes);

module.exports = router;
