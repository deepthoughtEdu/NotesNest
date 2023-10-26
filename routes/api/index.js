
var express = require('express');
var router = express.Router();

const authenticationRoutes = require('./authentication');
const userRoutes = require('./user');
const notesRoutes = require('./notes');

router.use('/auth', authenticationRoutes);
router.use('/user', userRoutes);
router.use('/notes', notesRoutes);

module.exports = router;
